import { axiosInstance } from '@axios'
import { routes } from '@services/routes'
import { useQuery } from '@tanstack/react-query'
import { CrimesData } from '../../types/crimes'

const get = async (): Promise<CrimesData> => {
  //   const filterParams = {
  //     [String(params?.type === '' ? 'first_name' : params?.type)]: params?.searchText,
  //     status: params?.status === '' ? null : Number(params?.status)
  //   }

  const { data } = await axiosInstance.get(`${routes?.['crime']}`)

  return data?.crimes
}

const getSingle = async (id: string): Promise<CrimesData> => {
  //   const filterParams = {
  //     [String(params?.type === '' ? 'first_name' : params?.type)]: params?.searchText,
  //     status: params?.status === '' ? null : Number(params?.status)
  //   }

  const { data } = await axiosInstance.get(`${routes?.['crime']}/${id}`)

  return data?.crime
}

export const useGetCrimes = () => {
  return useQuery(['crime'], () => get())
}

export const useGetSingleCrime = (id: string) => {
  return useQuery(['crimeSingle'], () => getSingle(id))
}
