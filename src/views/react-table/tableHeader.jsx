

export const blogColumns = ({ handleEdit, columnHelper, handleDelete }) => [
  columnHelper.accessor('title', {
    cell: info => info.getValue(),
    header: 'Title'
  }),

  columnHelper.accessor('author', {
    cell: info => info.getValue(),
    header: 'TO'
  }),
  columnHelper.accessor('date', {
    cell: info => info.getValue(),
    header: 'Date'
  }),

]
