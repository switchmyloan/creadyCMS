'use client'

import KitchenSink from '@/views/react-table/KitchenSink'
import { blogColumns } from '@/views/react-table/tableHeader'
import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper()
// Dummy blogs data (API se bhi aa sakta hai)
const blogData = [
  { id: 1, title: 'First Blog', author: 'Deepak', date: '2025-08-20' },
  { id: 2, title: 'Second Blog', author: 'Ravi', date: '2025-08-19' }
]


export default function Blogs() {
  return (
    <>
    <KitchenSink 
      data={blogData} 
      columns={blogColumns({ columnHelper })} 
      title="Blogs" 

    />
  </>
  )
}
