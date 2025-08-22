'use client'

import { useEffect, useMemo, useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import classnames from 'classnames'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender
} from '@tanstack/react-table'
import { rankItem } from '@tanstack/match-sorter-utils'
import Checkbox from '@mui/material/Checkbox'

// Components
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import ChevronRight from '@menu/svg/ChevronRight'
import styles from '@core/styles/table.module.css'
import { Button, Pagination, Typography } from '@mui/material'

// ---- Debounced Input ----
const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)
    return () => clearTimeout(timeout)
  }, [value, onChange, debounce])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// ---- Fuzzy Filter ----
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

// ---- Main Table Component ----
const KitchenSink = ({ data = [], columns = [], title = 'Data Table', btnText, btnFunc, totalDataCount, pagination, setPagination, onPageChange }) => {
  const [columnFilters, setColumnFilters] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [rowSelection, setRowSelection] = useState({})
  const [sort, setSort] = useState(true)
  const [sortColumn, setSortColumn] = useState('genre_name');

  // --- Checkbox Column ---
  const selectionColumn = {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        indeterminate={table.getIsSomeRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
        size="small"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        indeterminate={row.getIsSomeSelected()}
        onChange={row.getToggleSelectedHandler()}
        size="small"
      />
    )
  }

  const memoizedColumns = useMemo(() => [selectionColumn, ...columns], [columns])

  // const table = useReactTable({
  //   data: useMemo(() => data, [data]),
  //   columns: memoizedColumns,
  //   filterFns: { fuzzy: fuzzyFilter },
  //   state: { columnFilters, globalFilter, rowSelection },
  //   onColumnFiltersChange: setColumnFilters,
  //   onGlobalFilterChange: setGlobalFilter,
  //   onRowSelectionChange: setRowSelection,
  //   enableRowSelection: true, // enable selection
  //   getCoreRowModel: getCoreRowModel(),
  //   getFilteredRowModel: getFilteredRowModel(),
  //   getSortedRowModel: getSortedRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  //   getFacetedRowModel: getFacetedRowModel(),
  //   getFacetedUniqueValues: getFacetedUniqueValues(),
  //   getFacetedMinMaxValues: getFacetedMinMaxValues()
  // })
  const sortedData = useMemo(() => {
    return sort
      ? [...data].sort((a, b) => {
        const valA = a[sortColumn];
        const valB = b[sortColumn];

        if (typeof valA === 'string' && typeof valB === 'string') {
          return valA.localeCompare(valB);
        }

        if (typeof valA === 'number' && typeof valB === 'number') {
          return valA - valB;
        }

        if (valA instanceof Date && valB instanceof Date) {
          return valA - valB;
        }

        return 0;
      })
      : [...data].sort((a, b) => {
        const valA = a[sortColumn];
        const valB = b[sortColumn];

        if (typeof valA === 'string' && typeof valB === 'string') {
          return b[sortColumn].localeCompare(a[sortColumn]);
        }

        if (typeof valA === 'number' && typeof valB === 'number') {
          return valB - valA;
        }

        if (valA instanceof Date && valB instanceof Date) {
          return valB - valA;
        }

        return 0;
      });
  }, [data, sort, sortColumn]);
  const table = useReactTable({
    data: sortedData, // Use the raw data from props, not sortedData
    columns,
    state: {
      pagination,
      globalFilter,
    },
    manualPagination: true, // Enable server-side pagination
    pageCount: Math.ceil(totalDataCount / pagination.pageSize), // Total pages from server
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(), // Enable client-side sorting
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
  });

  // Access selected rows
  const selectedRows = table.getSelectedRowModel().rows.map(r => r.original)


  useEffect(() => {
    console.log(data, "data")
    // console.log(pagination, "pagination")
    onPageChange(pagination);
  }, [pagination])

  return (
    <Card className='overflow-visible'>
      <CardHeader
        title={title}
        action={
          <div className="flex gap-x-2">
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Search all columns...'
            />

            {btnText && (
              <Button
                variant="contained"
                className='flex gap-2 items-center'
                color="primary"
                onClick={btnFunc}
                size='small'
                sx={{ borderRadius: "25px", padding: "10px 30px" }}
              >
                <i className="tabler-plus h-5 w-5"></i>
                <p className='text-sm'>{btnText}</p>
              </Button>
            )}
          </div>
        }
      />

      <div className='overflow-x-auto'>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={classnames({
                          'flex items-center': header.column.getIsSorted(),
                          'cursor-pointer select-none': header.column.getCanSort()
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <ChevronRight fontSize='1.25rem' className='-rotate-90' />,
                          desc: <ChevronRight fontSize='1.25rem' className='rotate-90' />
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  No data available
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* <TablePaginationComponent table={table} /> */}


      <div className='flex justify-between items-center flex-wrap pli-6 border-bs bs-auto plb-[12.5px] gap-2'>
        <Typography color='text.disabled'>
          {`Showing ${totalDataCount === 0
            ? 0
            : (pagination?.pageIndex ?? 0) * (pagination?.pageSize ?? 10) + 1
            }
    to ${Math.min(
              ((pagination?.pageIndex ?? 0) + 1) * (pagination?.pageSize ?? 10),
              totalDataCount ?? 0
            )} of ${totalDataCount ?? 0} entries`}
        </Typography>

        <Pagination
          shape='rounded'
          color='primary'
          variant='tonal'
          count={Math.ceil((totalDataCount ?? 0) / (pagination?.pageSize ?? 10))}
          page={(pagination?.pageIndex ?? 0) + 1}
          onChange={(_, page) => table.setPageIndex(page - 1)}
          showFirstButton
          showLastButton
        />
      </div>

    </Card>
  )
}

export default KitchenSink
