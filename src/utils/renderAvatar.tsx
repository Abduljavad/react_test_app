import { Avatar } from '@mui/material'
import { getInitials } from 'src/@core/utils/get-initials'
import themeConfig from 'src/configs/themeConfig'
import { UsersType } from 'src/types/userTypes'

function stringToColor(string: string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string?.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

export const renderAvatar = (row: UsersType) => {
  if (row?.avatar && row?.avatar?.length) {
    return <Avatar src={row.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />
  } else {
    return (
      <Avatar
        sx={{
          //   bgcolor: themeConfigpalette.primary.contrastText,,
          mr: 2.5,
          width: 38,
          height: 38,
          fontWeight: 500,
          fontSize: theme => theme.typography.body1.fontSize
        }}
      >
        {getInitials(row?.firstName ? row?.firstName : 'John Doe')}
      </Avatar>
    )
  }
}
