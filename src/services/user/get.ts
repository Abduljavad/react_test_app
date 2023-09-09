import { axiosInstance } from '@axios'
import { useQuery } from '@tanstack/react-query'
// import { ISingleClient } from '@type/single-client'
import { routes } from '../routes'
import { UsersData, UsersType } from '../../types/userTypes'
// import { TClientFilter } from './types'

interface ISingleClient {
  user: string
}

const get = async (): Promise<UsersData> => {
  //   const filterParams = {
  //     [String(params?.type === '' ? 'first_name' : params?.type)]: params?.searchText,
  //     status: params?.status === '' ? null : Number(params?.status)
  //   }

  const { data } = await axiosInstance.get(`${routes?.['user']}`)

  return data?.users
}

const getEmergency = async (id: string) => {
  //   const filterParams = {
  //     [String(params?.type === '' ? 'first_name' : params?.type)]: params?.searchText,
  //     status: params?.status === '' ? null : Number(params?.status)
  //   }

  const { data } = await axiosInstance.get(`${routes?.['emergency_contacts']}?user_id=${id}`)

  return data
}

const getSingle = async (id: string): Promise<UsersType> => {
  //   const filterParams = {
  //     [String(params?.type === '' ? 'first_name' : params?.type)]: params?.searchText,
  //     status: params?.status === '' ? null : Number(params?.status)
  //   }

  const { data } = await axiosInstance.get(`/api/users/${id}`)

  return data?.user
}

export const useGetUser = () => {
  return useQuery(['users'], () => get())
}

export const useGetEmergencyContacts = (id: string) => {
  return useQuery(['emergency'], () => getEmergency(id))
}

export const useGetSingleUser = (id: string) => {
  return useQuery(['users', id], () => getSingle(id), {
    enabled: !!id
  })
}
