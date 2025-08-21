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
