import React from 'react'
import CreateEditCrime from '@views/crimes/create-edit-crime'

const CreateEditCrimePage = () => {
  return <CreateEditCrime />
}

export default CreateEditCrimePage

CreateEditCrimePage.authGuard = true
