import React, { Fragment } from 'react'
import CrimeCategoryList from 'src/views/crime-category/crime-category-list'

const CrimeCategoryPage = () => {
  return (
    <Fragment>
      <CrimeCategoryList />
    </Fragment>
  )
}

export default CrimeCategoryPage

CrimeCategoryPage.authGuard = true
