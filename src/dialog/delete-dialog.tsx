// ** React Imports
import React, { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import { CircularProgress } from '@mui/material'
import { useDeleteCrimeCategory } from '@services/crime-category/delete-crime-category'
import { toast } from 'react-hot-toast'

const DeleteDialogForm: React.FC<{
  id: number
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleDelete: () => void
  onClose: () => void
  isLoading: boolean
}> = ({ id, open, setOpen, onClose, handleDelete, isLoading }) => {
  // ** State

  return (
    <Fragment>
      {/* <Button variant='outlined' onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={open} onClose={onClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title' variant='h3' sx={{ textAlign: 'center' }}>
          Are you sure you want to delete this crime category?
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          {/* <DialogContentText variant='h5' sx={{ mb: 3 }}>
            All Crime
          </DialogContentText> */}
          {/* <CustomTextField id='name' autoFocus fullWidth type='email' label='Email Address' /> */}
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={onClose}>No</Button>
          <Button variant={'contained'} onClick={handleDelete} color='error'>
            {isLoading ? (
              <CircularProgress
                sx={{
                  color: 'common.white',
                  width: '20px !important',
                  height: '20px !important',
                  mr: theme => theme.spacing(2)
                }}
              />
            ) : null}
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default DeleteDialogForm
