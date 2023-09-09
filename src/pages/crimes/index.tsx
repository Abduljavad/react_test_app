import React from 'react'
import CrimeList from '@views/crimes/crime-list'

const CrimePage = () => {
  return <CrimeList />
}

export default CrimePage

CrimePage.authGuard = true
