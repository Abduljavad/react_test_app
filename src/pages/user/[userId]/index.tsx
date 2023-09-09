import { Grid } from '@mui/material'
import EmergencyContacts from 'src/views/user/EmergencyContacts'
import UserView from 'src/views/user/UserView'

const UserViewPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={7} xl={8}>
        <UserView />
      </Grid>
      <Grid item xs={12} lg={5} xl={4}>
        <EmergencyContacts />
      </Grid>
    </Grid>
  )
}

export default UserViewPage

UserViewPage.authGuard = true
