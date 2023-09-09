import React from 'react'
import CreateEditCrimeCategory from 'src/views/crime-category/create-edit-crime-category'

const CreateCrimeCategoryPage = () => {
  return <CreateEditCrimeCategory />
}

export default CreateCrimeCategoryPage

CreateCrimeCategoryPage.authGuard = true
