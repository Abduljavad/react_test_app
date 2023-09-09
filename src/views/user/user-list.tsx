import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import Card from '@mui/material/Card'
import { IconButton, Menu, MenuItem, Typography } from '@mui/material'
import Link from 'next/link'
import { UsersData, UsersType } from 'src/types/userTypes'
import { renderAvatar } from 'src/utils/renderAvatar'
import Icon from 'src/@core/components/icon'
import TableHeader from 'src/@core/components/table-header'
import { useRouter } from 'next/router'
import { useGetUser } from '@services/user/get'

interface CellType {
  row: UsersType
  value?: string
}

// import { Grid } from '@mui/material'

const RowOptions = ({ item }: { item: UsersType }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    handleRowOptionsClose()
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='tabler:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          href={`/user/${item?.id}/`}
          onClick={handleRowOptionsClose}
        >
          <Icon icon='tabler:eye' fontSize={20} />
          View
        </MenuItem>
        {/* <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:edit' fontSize={20} />
          Edit
        </MenuItem> */}
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:trash' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

const columns: GridColDef[] = [
  {
    flex: 0.25,
    minWidth: 280,
    field: 'name',
    headerName: 'User Name',
    renderCell: ({ row, value }: CellType) => {
      const { name } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderAvatar(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography
              noWrap
              component={Link}
              href='/apps/user/view/account'
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {value}
            </Typography>
            {/* <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
              {'hi'}
            </Typography> */}
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 190,
    field: 'Email',
    headerName: 'Email',
    renderCell: ({ row }: CellType) => {
      const { email } = row

      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {email}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 190,
    field: 'Phone',
    headerName: 'Phone',
    renderCell: ({ row }: CellType) => {
      const { phone_number } = row

      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {phone_number}
        </Typography>
      )
    }
  },
  // {
  //   flex: 0.15,
  //   minWidth: 190,
  //   field: 'No of Organizations',
  //   headerName: 'No of Organizations',
  //   renderCell: ({ row }: CellType) => {
  //     return (
  //       <Typography noWrap sx={{ color: 'text.secondary' }}>
  //         10
  //       </Typography>
  //     )
  //   }
  // },
  {
    flex: 0.1,
    minWidth: 100,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }: CellType) => <RowOptions item={row} />
  }
]

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
// ]

export default function UserList() {
  const { data, error } = useGetUser()
  console.log(data, 'data')

  const [paginationModel, setPaginationModel] = React.useState({ page: 0, pageSize: 10 })

  if (data) {
    return (
      <Box sx={{ height: 400, width: '100%' }}>
        <Card>
          <DataGrid
            autoHeight
            rows={data?.data as UsersType[]}
            columns={columns}
            pageSizeOptions={[10]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 8
                }
              }
            }}
            disableRowSelectionOnClick
          />
        </Card>
      </Box>
    )
  }

  return null
}
