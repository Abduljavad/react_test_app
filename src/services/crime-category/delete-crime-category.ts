import { axiosInstance } from '@axios'
import { routes } from '@services/routes'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const deleteCrime = async (val: { id: number }) => {
  //   const filterParams = {
  //     [String(params?.type === '' ? 'first_name' : params?.type)]: params?.searchText,
  //     status: params?.status === '' ? null : Number(params?.status)
  //   }

  const { data } = await axiosInstance.delete(`${routes?.crimeCategory}/${val?.id}`)

  return data
}

export const useDeleteCrimeCategory = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteCrime, {
    onSuccess: () => {
      queryClient.invalidateQueries([routes?.crimeCategory])
    }
  })
}
