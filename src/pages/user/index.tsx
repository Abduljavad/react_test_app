import React from 'react'
import UserList from 'src/views/user/user-list'

const UserListPage = () => {
  return <UserList />
}

export default UserListPage

UserListPage.authGuard = true
