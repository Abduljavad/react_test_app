import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { useGetEmergencyContacts } from '@services/user/get'
import { useRouter } from 'next/router'
import React from 'react'
import CardSnippet from 'src/@core/components/card-snippet'
import CustomChip from 'src/@core/components/mui/chip'

const EmergencyContacts = () => {
  const router = useRouter()
  const userId = router.query?.userId

  const { data } = useGetEmergencyContacts(userId as string)

  console.log(data, 'data')

  return (
    <Box sx={{ p: 4 }}>
      <Typography sx={{ fontSize: 30 }} color={'error'}>
        Emergency Contacts
      </Typography>
      <Grid container spacing={5} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={6} md={5} lg={6}>
          <Card>
            <CardContent>
              <Typography sx={{ fontSize: 16, mb: 0 }} color={'primary'}>
                John Doe
              </Typography>
              <Typography sx={{ fontSize: 13, mb: 2.5 }}>Johndoe@gmail.com</Typography>
              <CustomChip
                rounded
                skin='light'
                size='small'
                label={'+918137944170'}
                color={'info'}
                sx={{ textTransform: 'capitalize' }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={5} lg={6}>
          <Card>
            <CardContent>
              <Typography sx={{ fontSize: 16, mb: 0 }} color={'primary'}>
                John Doe
              </Typography>
              <Typography sx={{ fontSize: 13, mb: 2.5 }}>Johndoe@gmail.com</Typography>
              <CustomChip
                rounded
                skin='light'
                size='small'
                label={'+918137944170'}
                color={'info'}
                sx={{ textTransform: 'capitalize' }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={5} lg={6}>
          <Card>
            <CardContent>
              <Typography sx={{ fontSize: 16, mb: 0 }} color={'primary'}>
                John Doe
              </Typography>
              <Typography sx={{ fontSize: 13, mb: 2.5 }}>Johndoe@gmail.com</Typography>
              <CustomChip
                rounded
                skin='light'
                size='small'
                label={'+918137944170'}
                color={'info'}
                sx={{ textTransform: 'capitalize' }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default EmergencyContacts
