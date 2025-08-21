import { IconButton } from "@mui/material"


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
  {
    header: 'Action',
    cell: info => {
      const rowData = info.row.original // Access the row's original data

      return (
        <>

          <IconButton>
            <i className='tabler-pencil' onClick={() => handleEdit(rowData)} />
          </IconButton>

          <IconButton>
            <i className='tabler-trash' onClick={() => handleDelete(rowData)} />
          </IconButton>

        </>
      )
    }
  }

]
export const tagsColumns = ({ handleEdit, columnHelper, handleDelete }) => [
  columnHelper.accessor('Name', {
    cell: info => info.getValue(),
    header: 'Name'
  }),

  columnHelper.accessor('Description', {
    cell: info => info.getValue() || 'N/A',
    header: 'Description'
  }),
  {
    header: 'Action',
    cell: info => {
      const rowData = info.row.original // Access the row's original data

      return (
        <>

          <IconButton>
            <i className='tabler-pencil' onClick={() => handleEdit(rowData)} />
          </IconButton>

          <IconButton>
            <i className='tabler-trash' onClick={() => handleDelete(rowData)} />
          </IconButton>

        </>
      )
    }
  }

]
