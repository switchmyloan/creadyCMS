import { IconButton, Tooltip, Typography } from "@mui/material"

const renderWithTooltip = (text, width = 150) => (
  <Tooltip title={text} arrow placement='top'>
    <Typography
      noWrap
      sx={{
        maxWidth: width,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}
    >
      {text}
    </Typography>
  </Tooltip>
)

export const blogColumns = ({ handleEdit, columnHelper, handleDelete }) => [
  columnHelper.accessor('title', {
    header: 'Title',
    cell: info => renderWithTooltip(info.getValue(), 180) // 👈 set width here
  }),

  columnHelper.accessor('slug', {
    header: 'Slug',
    cell: info => renderWithTooltip(info.getValue(), 180)
  }),

  columnHelper.accessor('description', {
    header: 'Description',
    cell: info => renderWithTooltip(info.getValue(), 250)
  }),

  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => renderWithTooltip(info.getValue(), 120)
  }),

  // {
  //   header: 'Actions',
  //   cell: info => {
  //     const rowData = info.row.original
  //     return (
  //       <>
  //         <IconButton onClick={() => handleEdit(rowData)}>
  //           <i className="tabler-pencil" />
  //         </IconButton>

  //         <IconButton onClick={() => handleDelete(rowData)}>
  //           <i className="tabler-trash" />
  //         </IconButton>
  //       </>
  //     )
  //   }
  // }
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
