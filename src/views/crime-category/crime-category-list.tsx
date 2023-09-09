import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Card from '@mui/material/Card'
import { IconButton, Menu, MenuItem, Typography } from '@mui/material'
import Link from 'next/link'
import { renderAvatar } from 'src/utils/renderAvatar'
import Icon from 'src/@core/components/icon'
import { CategoryType } from 'src/types/categoryType'
import { useRouter } from 'next/router'
import TableHeader from 'src/@core/components/table-header'
import { useGetCrimeCategory } from '@services/crime-category/get-crime-category'
import { Crimecategory } from '../../types/crime-category'
import DeleteDialogForm from 'src/dialog/delete-dialog'
import { useDeleteCrimeCategory } from '@services/crime-category/delete-crime-category'
import { toast } from 'react-hot-toast'

interface CellType {
  row: Crimecategory
  value?: string
}

// import { Grid } from '@mui/material'

const RowOptions = ({ item }: { item: Crimecategory }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [deletModal, setDeleteModal] = React.useState<boolean>(false)
  const router = useRouter()
  const rowOptionsOpen = Boolean(anchorEl)

  //   const handleClickOpen = () => setOpen(true)
  const { mutate, isLoading } = useDeleteCrimeCategory()

  const handleClose = () => {
    mutate(
      { id: item?.id },
      {
        onSuccess: () => {
          setDeleteModal(false), toast.success('Succesfully deleted')
        }
      }
    )
  }

  const handleRowOptionsClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsEdit = () => {
    router.push(`/crime-category/${item?.id}`)
  }

  const handleDelete = () => {
    setDeleteModal(true)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      {deletModal && (
        <DeleteDialogForm
          id={item?.id}
          open={deletModal}
          setOpen={setDeleteModal}
          handleDelete={handleClose}
          isLoading={isLoading}
          onClose={() => setDeleteModal(false)}
        />
      )}

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
        <MenuItem onClick={handleRowOptionsEdit} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:edit' fontSize={20} />
          Edit
        </MenuItem>
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
    headerName: 'Category',
    renderCell: ({ row, value }: CellType) => {
      const { name } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* {renderAvatar(row)} */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography
              noWrap
              variant='body1'
              component={Link}
              href='/apps/user/view/account'
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {name}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 190,
    field: 'intensity',
    headerName: 'Intensity',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {Number(row.intensity).toFixed(0)}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 190,
    field: 'Colour',
    headerName: 'Colour',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.color_code}
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

const CrimeCategoryList = () => {
  const { data } = useGetCrimeCategory()
  const [paginationModel, setPaginationModel] = React.useState({ page: 0, pageSize: 10 })
  const [value, setValue] = React.useState('')
  const router = useRouter()
  const handleFilter = React.useCallback((val: string) => {
    setValue(val)
  }, [])

  console.log(data, 'data')

  const toggleAddUserDrawer = () => {
    router.push('crime-category/create')
  }

  if (data) {
    return (
      <Box sx={{ height: 400, width: '100%' }}>
        <Card>
          <TableHeader
            value={value}
            handleFilter={handleFilter}
            toggle={toggleAddUserDrawer}
            buttonText='Add Category'
          />
          <DataGrid
            autoHeight
            rows={data as Crimecategory[]}
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

export default CrimeCategoryList
