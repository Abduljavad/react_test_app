import { axiosInstance } from '@axios'
import { useMutation } from '@tanstack/react-query'
// import { ISingleClient } from '@type/single-client'
import { routes } from '../routes'
import { CrimesData } from '../../types/crimes'
// import { TClientFilter } from './types'

const post = async (val: any): Promise<CrimesData> => {
  //   const filterParams = {
  //     [String(params?.type === '' ? 'first_name' : params?.type)]: params?.searchText,
  //     status: params?.status === '' ? null : Number(params?.status)
  //   }

  const { data } = await axiosInstance.post(`${routes?.crime}`, val)

  return data?.crime
}

const edit = async (val: any) => {
  //   const filterParams = {
  //     [String(params?.type === '' ? 'first_name' : params?.type)]: params?.searchText,
  //     status: params?.status === '' ? null : Number(params?.status)
  //   }
  console.log(val?.id, 'id')

  const id = val?.id
  delete val?.id
  const { data } = await axiosInstance.put(`${routes?.crime}/${id}`, val)

  return data?.crime
}

export const useCreateCrime = () => {
  return useMutation(post)
}

export const useEditCrime = () => {
  return useMutation(edit)
}
