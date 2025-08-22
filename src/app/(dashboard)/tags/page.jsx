'use client'

import { DeleteTag, getTags } from '@/api-services/cms-service'
import ConfirmationModal from '@/components/forms/ConfirmationModal'
import ToastNotification from '@/components/forms/ToastNotification'
import KitchenSink from '@/views/react-table/KitchenSink'
import { blogColumns, tagsColumns } from '@/views/react-table/tableHeader'
import { createColumnHelper } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Toaster } from "react-hot-toast";

export default function Blogs() {
    const columnHelper = createColumnHelper()
    const router = useRouter();
    const [data, setData] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    const [totalDataCount, setTotalDataCount] = useState(0);
    const [globalFilter, setGlobalFilter] = useState('');
    const [tagId, setTagId] = useState(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [actionType, setActionType] = useState('');
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
        // totalDataCount: totalDataCount ? totalDataCount : 1
    })
    const [query, setQuery] = useState({
        limit: 10,
        page_no: 1,
        search: ''
    });



    const handleEdit = (data) => {
        router.push(`/tags/${data.ID}`);
    };


    const handleDelete = (data) => {
        setTagId(data.ID)
        setOpen(true)
        setActionType('delete')
    };

    const fetchTags = async () => {
        try {
            setLoadingData(true);
            const response = await getTags(query.page_no, query.limit, globalFilter);

            console.log('Response:', response.data.data);
            if (response?.data?.success) {
                setData(response?.data?.data || []);
                setTotalDataCount(response?.data?.pagination?.total || 0);
            } else {
                ToastNotification.error("Error fetching currencies");
            }
        } catch (error) {
            console.error('Error fetching currencies:', error);
            ToastNotification.error('Failed to fetch data');
            router.push('/login');
        } finally {
            setLoadingData(false);
        }
    };





    const btnHandle = (name) => {
        router.push(name);
    };

    const onPageChange = (pageNo) => {
        setQuery((prevQuery) => {
            // console.log(prevQuery); // Log the previous query state
            return {
                ...prevQuery,
                page_no: pageNo.pageIndex + 1 // Increment page number by 1
            };
        });
    };

    const deleteTag = async () => {
        setLoading(true);
        try {
            const response = await DeleteTag(tagId);

            if (response?.data?.success) {
                ToastNotification.success(response?.data?.message);
                setOpen(false);
                setLoading(false)
                fetchTags();
            } else {
                setLoading(false);
                setOpen(false);

                ToastNotification.error('Failed to delete language');
            }
        } catch (error) {
            setLoading(false)
            console.error('Error deleting language:', error);
            ToastNotification.error(response?.data?.message);
        }
    };


    useEffect(() => {
        fetchTags();
    }, [query.page_no, globalFilter]);

    return (
        <>
            <Toaster />
            <ConfirmationModal
                open={open}
                setOpen={setOpen}
                handleConfirm={deleteTag}
                loading={loading}
                setLoading={setLoading}
                className='p-6'
                actionType={actionType}
            />
            <KitchenSink
                data={data}
                totalDataCount={totalDataCount}
                onPageChange={onPageChange}
                columns={tagsColumns({
                    columnHelper,
                    handleEdit,
                    handleDelete
                })}
                title="Tags"
                btnText='Add Tags'
                btnFunc={() => btnHandle('/tags/create')}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                pagination={pagination}
                setPagination={setPagination}
            />
        </>
    )
}
