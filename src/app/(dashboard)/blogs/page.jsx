'use client'

import { getBlogs, getTags } from '@/api-services/cms-service'
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
    router.push(`/blogs/${data.id}`);
  };


  const handleDelete = (data) => {

  };

  const fetchTags = async () => {
    try {
      setLoadingData(true);
      const response = await getBlogs(query.page_no, query.limit, globalFilter);

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


  useEffect(() => {
    fetchTags();
  }, [query.page_no, globalFilter]);


  const btnHandle = (name) => {
    router.push(name);
  };

  const onPageChange = (paginationState) => {
    const newPageNo = paginationState.pageIndex + 1; // Increment for API
    if (newPageNo !== query.page_no) { // Only change if different
      setQuery((prevQuery) => ({
        ...prevQuery,
        page_no: newPageNo,
      }));
    }
  };

  return (
    <>
      <Toaster />
      <KitchenSink
        data={data}
        totalDataCount={totalDataCount}
        onPageChange={onPageChange}
        columns={blogColumns({
          columnHelper,
          handleEdit,
          handleDelete
        })}
        title="Blogs"
        btnText='Add Blog'
        btnFunc={() => btnHandle('/blogs/create')}
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  )
}
