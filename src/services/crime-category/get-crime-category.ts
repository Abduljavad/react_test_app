import { axiosInstance } from '@axios'
import { useQuery } from '@tanstack/react-query'
// import { ISingleClient } from '@type/single-client'
import { routes } from '../routes'
import { UsersType } from '../../types/userTypes'
import { Crimecategory } from '../../types/crime-category'
// import { TClientFilter } from './types'

const get = async (): Promise<Crimecategory[]> => {
  //   const filterParams = {
  //     [String(params?.type === '' ? 'first_name' : params?.type)]: params?.searchText,
  //     status: params?.status === '' ? null : Number(params?.status)
  //   }

  const { data } = await axiosInstance.get(`${routes?.crimeCategory}`)

  return data?.crime_categories
}

export const useGetCrimeCategory = () => {
  return useQuery([routes?.crimeCategory], () => get())
}
