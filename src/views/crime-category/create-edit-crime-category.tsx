// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Alert, Box, MenuItem, Typography } from '@mui/material'
import { useCreateCrimeCategory, useEditCrimeCategory } from '@services/crime-category/create-edit-crime-category'
import UseBgColor from 'src/@core/hooks/useBgColor'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { Crimecategory } from '../../types/crime-category'

interface State {
  password: string
  showPassword: boolean
}

interface FormInputs {
  name: string
  intensity: number
  color_code: string
}

const defaultValues = {
  name: '',
  intensity: undefined,
  color_code: ''
}

const colors = [
  '#ffff01',
  '#c0ff00',
  '#00ff01',
  '#00807f',
  '#0000fe',
  '#5c01ff',
  '#7f00ff',
  '#7f00ff',
  '#fe0000',
  '#ff5100',
  '#ff7f00',
  '#ffbe00',
  '#c07e41',
  '#be4041',
  '#c04001',
  '#be40be',
  '#7f00bf',
  '#40bf00',
  '#555555'
]

const CreateEditCrimeCategory: React.FC<{ response?: Crimecategory }> = ({ response }) => {
  // ** States
  const [state, setState] = useState<State>({
    password: '',
    showPassword: false
  })

  const {
    mutate: create,
    isLoading: createLoading,
    isError: isErrorCreate,
    error: apiErrorCreate
  } = useCreateCrimeCategory()
  const { mutate: edit, isLoading: editLoading, isError: isErrorEdit, error: apiErrorEdit } = useEditCrimeCategory()
  const bgColors = UseBgColor()
  const router = useRouter()
  const loading = createLoading || editLoading
  const isError = isErrorCreate || isErrorEdit
  const error = apiErrorCreate || apiErrorEdit
  // ** Hook
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>({
    defaultValues: response
      ? { ...response, intensity: Number(Number(response?.intensity)?.toFixed(0)) }
      : defaultValues
  })

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword })
  }

  const onSubmit = async (val: FormInputs) => {
    console.log(val, 'val')
    const data = {
      name: val?.name,
      intensity: val?.intensity,
      color_code: val?.color_code,
      ...(response ? { id: response?.id } : null)
    }
    if (response) {
      edit(data, {
        onSuccess: () => {
          toast.success('Crime Category Successfully updated')
        }
      })
    } else {
      create(data, {
        onSuccess: () => {
          toast.success('Crime Category Successfully created'), router.replace('/crime-category')
        }
      })
    }
    // const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
    // await sleep(2000)
    // setLoading(false)
  }

  const errorMessage: any = (error as AxiosError)?.response?.data

  return (
    <Card>
      <CardHeader title={response ? 'Edit Crime Category' : 'Create Crime Category'} />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Controller
                name='name'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Category Name'
                    onChange={onChange}
                    placeholder='Crime'
                    error={Boolean(errors.name)}
                    aria-describedby='validation-async-first-name'
                    {...(errors.name && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <Controller
                name='color_code'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    defaultValue=''
                    label='Color code'
                    SelectProps={{
                      value: value,
                      onChange: e => onChange(e)
                    }}
                    id='validation-basic-select'
                    error={Boolean(errors.color_code)}
                    aria-describedby='validation-basic-select'
                    {...(errors.color_code && { helperText: 'This field is required' })}
                  >
                    {colors?.map((val, index) => {
                      return (
                        <MenuItem key={index} value={val}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <div style={{ backgroundColor: val, borderRadius: '200px', width: 20, height: 20 }}></div>
                            {val}
                          </Box>
                        </MenuItem>
                      )
                    })}

                    {/* <MenuItem value='USA'>USA</MenuItem>
                    <MenuItem value='Australia'>Australia</MenuItem>
                    <MenuItem value='Germany'>Germany</MenuItem> */}
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Controller
                name='intensity'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Intensity'
                    onChange={onChange}
                    error={Boolean(errors.intensity)}
                    type='number'
                    inputProps={{}}
                    // type={state.showPassword ? 'text' : 'password'}
                    {...(errors.intensity && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>

            {errorMessage && (
              <Grid item xs={12}>
                <Alert icon={false} sx={{ py: 3, ...bgColors.errorFilled, '& .MuiAlert-message': { p: 0 } }}>
                  <Typography sx={{ color: 'white' }}>{errorMessage?.message}</Typography>
                  {/* <Typography variant='body2' sx={{ color: 'white' }}>
                  Client: <strong>client@vuexy.com</strong> / Pass: <strong>client</strong>
                </Typography> */}
                </Alert>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button type='submit' variant='contained'>
                {loading ? (
                  <CircularProgress
                    sx={{
                      color: 'common.white',
                      width: '20px !important',
                      height: '20px !important',
                      mr: theme => theme.spacing(2)
                    }}
                  />
                ) : null}
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default CreateEditCrimeCategory
