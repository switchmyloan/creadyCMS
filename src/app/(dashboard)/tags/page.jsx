'use client'

import { getTags } from '@/api-services/cms-service'
import KitchenSink from '@/views/react-table/KitchenSink'
import { blogColumns, tagsColumns } from '@/views/react-table/tableHeader'
import { createColumnHelper } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Blogs() {
    const columnHelper = createColumnHelper()
    const router = useRouter();
    const [data, setData] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    const [totalDataCount, setTotalDataCount] = useState(0);
    const [query, setQuery] = useState({
        page_no: 1,
        limit: 10,
        globalFilter: ''
    });
    const [globalFilter, setGlobalFilter] = useState('');


    const handleEdit = (data) => {
        router.push(`/blogs/${data.id}`);
    };


    const handleDelete = (data) => {

    };

    const fetchTags = async () => {
        try {
            setLoadingData(true);
            const response = await getTags(query.page_no, query.limit, globalFilter);

            console.log('Response:', response.data.data);
            if (response?.data?.success) {
                setData(response?.data?.data || []);
                setTotalDataCount(response?.data?.data?.pagination?.totalItems || 0);
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


    useEffect(() => {
        fetchTags();
    }, [query.page_no, globalFilter]);


    const btnHandle = (name) => {
        router.push(name);
    };

    return (
        <>
            <KitchenSink
                data={data}
                columns={tagsColumns({
                    columnHelper,
                    handleEdit,
                    handleDelete
                })}
                title="Blogs"
                btnText='Add Blogs'
                btnFunc={() => btnHandle('/blogs/create')}
            />
        </>
    )
}
