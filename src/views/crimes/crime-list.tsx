import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import Card from '@mui/material/Card'
import { IconButton, Menu, MenuItem, Typography } from '@mui/material'
import Link from 'next/link'
import { renderAvatar } from 'src/utils/renderAvatar'
import Icon from 'src/@core/components/icon'
import { CategoryType } from 'src/types/categoryType'
import { useRouter } from 'next/router'
import TableHeader from 'src/@core/components/table-header'
import { useGetCrimes } from '@services/crime/get-crime'
import { Crimes } from '../../types/crimes'
import DeleteDialogForm from 'src/dialog/delete-dialog'
import { useDeleteCrime } from '@services/crime/delete-crime'
import { toast } from 'react-hot-toast'

interface CellType {
  row: Crimes
  value?: string
}

// import { Grid } from '@mui/material'

const RowOptions = ({ item }: { item: Crimes }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [deletModal, setDeleteModal] = React.useState<boolean>(false)
  const router = useRouter()

  const rowOptionsOpen = Boolean(anchorEl)

  const { mutate, isLoading } = useDeleteCrime()

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
    router.push(`/crimes/${item?.id}`)
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
    flex: 0.1,
    minWidth: 180,
    field: 'crime_reports',
    headerName: 'Reported By',
    renderCell: ({ row, value }: CellType) => {
      const { crime_reports } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* {renderAvatar(row)} */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography
              noWrap
              variant='body1'
              // component={Link}
              // href='/apps/user/view/account'
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {crime_reports?.reported_by}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  // {
  //   flex: 0.1,
  //   minWidth: 190,
  //   field: 'crime_reports',
  //   headerName: 'Crime verified by',
  //   renderCell: ({ row }: CellType) => {
  //     const { crime_reports } = row

  //     return (
  //       <Typography noWrap sx={{ color: 'text.secondary' }}>
  //         {crime_reports?.verified_by}
  //       </Typography>
  //     )
  //   }
  // },
  {
    flex: 0.15,
    minWidth: 190,
    field: 'crime_category',
    headerName: 'Crime category',
    renderCell: ({ row }: CellType) => {
      const { crime_category } = row

      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {crime_category?.name}
        </Typography>
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

const rows = [
  { id: 1, colour: 'Snow', category: 'Jon', intensity: 35 },
  { id: 2, colour: 'Lannister', category: 'Cersei', intensity: 42 },
  { id: 3, colour: 'Lannister', category: 'Jaime', intensity: 45 },
  { id: 4, colour: 'Stark', category: 'Arya', intensity: 16 },
  { id: 5, colour: 'Targaryen', category: 'Daenerys', intensity: 20 },
  { id: 6, colour: 'Melisandre', category: 'test', intensity: 150 },
  { id: 7, colour: 'Clifford', category: 'Ferrara', intensity: 44 },
  { id: 8, colour: 'Frances', category: 'Rossini', intensity: 36 },
  { id: 9, colour: 'Roxie', category: 'Harvey', intensity: 65 }
]

export default function CrimeList() {
  const [paginationModel, setPaginationModel] = React.useState({ page: 0, pageSize: 10 })
  const [value, setValue] = React.useState('')
  const router = useRouter()
  const handleFilter = React.useCallback((val: string) => {
    setValue(val)
  }, [])

  const toggleAddUserDrawer = () => {
    router.push('crimes/create')
  }

  const { data: crimeData } = useGetCrimes()
  console.log(crimeData, 'data')

  if (crimeData) {
    return (
      <Box sx={{ height: 400, width: '100%' }}>
        <Card>
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} buttonText='Add Crime' />
          <DataGrid
            autoHeight
            rows={crimeData?.data as Crimes[]}
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
