// ** React Imports
import { ChangeEvent, forwardRef, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

// ** Icon Imports
import { Box, MenuItem } from '@mui/material'
import ReactDatePicker from 'react-datepicker'
import { DateType } from 'src/types/reactDatepickerTypes'
import GoogleMapReact from 'google-map-react'
import MyMarker from './Market'
import { useGetCrimeCategory } from '@services/crime-category/get-crime-category'
import { useCreateCrime, useEditCrime } from '@services/crime/create-edit-crime'
import { useRouter } from 'next/router'
import { Crimes } from '../../types/crimes'

interface State {
  password: string
  showPassword: boolean
}

interface FormInputs {
  reported_by: string
  verified_by: string
  crime_category_id: number | null
  latitude: string
  longitude: string
  description: string
  color_code: string
  intensity: number
}

const defaultValues = {
  reported_by: '',
  verified_by: '',
  crime_category_id: null,
  latitude: '',
  longitude: '',
  description: '',
  color_code: '',
  intensity: undefined
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

interface CustomInputProps {
  value: DateType
  label: string
  error: boolean
  onChange: (event: ChangeEvent) => void
}

const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => {
  return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const CreateEditCrime: React.FC<{ response?: Crimes | any }> = ({ response }) => {
  // ** States
  const router = useRouter()
  const { data } = useGetCrimeCategory()

  // ** Hook
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>({
    defaultValues: response
      ? {
          ...response,
          intensity: Number(Number(response?.intensity)?.toFixed(0)),
          reported_by: response.crime_reports?.reported_by,
          verified_by: response?.crime_reports?.verified_by,
          latitude: Number(response?.crime_reports?.latitude)?.toFixed(0),
          longitude: Number(response?.crime_reports?.longitude)?.toFixed(0),
          description: response?.crime_reports?.description
        }
      : defaultValues
  })

  const { mutate: create, isLoading: createLoading, isError: isErrorCreate, error: apiErrorCreate } = useCreateCrime()
  const { mutate: edit, isLoading: editLoading, isError: isErrorEdit, error: apiErrorEdit } = useEditCrime()

  const loading = createLoading || editLoading
  const isError = isErrorCreate || isErrorEdit
  const error = apiErrorCreate || apiErrorEdit

  // const handleClickShowPassword = () => {
  //   setState({ ...state, showPassword: !state.showPassword })
  // }

  const onSubmit = async (val: FormInputs) => {
    console.log(val)
    Object.keys(val).forEach(key => (val as any)?.[key] === '' && delete (val as any)?.[key])
    if (response) {
      edit(val, {
        onSuccess: () => {
          toast.success(' Crime edited successfully')
        }
      })
    } else {
      create(val, {
        onSuccess: () => {
          toast.success('New Crime Created')
          router.replace('/crimes')
        }
      })
    }
  }

  return (
    <Card>
      <CardHeader title={response ? 'Edit Crime' : 'Create Crime'} />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <Controller
                name='reported_by'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Crime reported by'
                    onChange={onChange}
                    placeholder='Leonard'
                    error={Boolean(errors.reported_by)}
                    aria-describedby='validation-async-first-name'
                    {...(errors.reported_by && { helperText: 'Please add a reporter name' })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name='crime_category_id'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label='Crime category'
                    SelectProps={{
                      value: value,
                      onChange: e => onChange(e)
                    }}
                    id='validation-basic-select'
                    error={Boolean(errors.crime_category_id)}
                    aria-describedby='validation-basic-select'
                    {...(errors.crime_category_id && { helperText: 'This field is required' })}
                  >
                    {data?.map((val, index) => {
                      return (
                        <MenuItem key={val?.id} value={val?.id}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>{val?.name}</Box>
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

            <Grid item xs={12} md={6} lg={6}>
              <Controller
                name='latitude'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Latitude'
                    onChange={onChange}
                    error={Boolean(errors.latitude)}
                    type='number'
                    inputProps={{}}
                    // type={state.showPassword ? 'text' : 'password'}
                    // {...(errors.description && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <Controller
                name='longitude'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    rows={2}
                    maxRows={4}
                    fullWidth
                    value={value}
                    label='Longitude'
                    onChange={onChange}
                    error={Boolean(errors.longitude)}
                    type='number'
                    inputProps={{}}
                    // type={state.showPassword ? 'text' : 'password'}
                    // {...(errors.description && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <Controller
                name='color_code'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label='Color code'
                    SelectProps={{
                      value: value,
                      onChange: e => onChange(e)
                    }}
                    id='validation-basic-select'
                    error={Boolean(errors.color_code)}
                    aria-describedby='validation-basic-select'
                    {...(errors.color_code && { helperText: 'Please select a color' })}
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

            <Grid item xs={12} md={6} lg={6}>
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
            <Grid item xs={12} lg={6}>
              <Controller
                name='verified_by'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Crime Verified by'
                    onChange={onChange}
                    error={Boolean(errors.verified_by)}
                    inputProps={{}}
                    // type={state.showPassword ? 'text' : 'password'}
                    {...(errors.verified_by && { helperText: 'Please enter a description' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Controller
                name='description'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Description'
                    onChange={onChange}
                    error={Boolean(errors.description)}
                    inputProps={{}}
                    // type={state.showPassword ? 'text' : 'password'}
                    {...(errors.description && { helperText: 'Please enter a description' })}
                  />
                )}
              />
            </Grid>

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

export default CreateEditCrime
