import { axiosInstance } from '@axios'
import { useMutation, useQuery } from '@tanstack/react-query'
// import { ISingleClient } from '@type/single-client'
import { routes } from '../routes'
import { UsersType } from '../../types/userTypes'
import { Crimecategory } from '../../types/crime-category'
// import { TClientFilter } from './types'

const post = async (val: any): Promise<Crimecategory[]> => {
  //   const filterParams = {
  //     [String(params?.type === '' ? 'first_name' : params?.type)]: params?.searchText,
  //     status: params?.status === '' ? null : Number(params?.status)
  //   }

  const { data } = await axiosInstance.post(`${routes?.crimeCategory}`, val)

  return data?.crime_categories
}

const edit = async (val: any) => {
  //   const filterParams = {
  //     [String(params?.type === '' ? 'first_name' : params?.type)]: params?.searchText,
  //     status: params?.status === '' ? null : Number(params?.status)
  //   }
  console.log(val?.id, 'id')

  const id = val?.id
  delete val?.id
  const { data } = await axiosInstance.put(`${routes?.crimeCategory}/${id}`, val)

  return data?.crime_categories
}

export const useCreateCrimeCategory = () => {
  return useMutation(post)
}

export const useEditCrimeCategory = () => {
  return useMutation(edit)
}
