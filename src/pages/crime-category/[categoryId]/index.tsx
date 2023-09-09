import { CategoryApiResponse } from '../../../types/crime-category'
import { useRouter } from 'next/router'
import React from 'react'
import CreateEditCrimeCategory from 'src/views/crime-category/create-edit-crime-category'

const EditCrimeCategoryPage = ({ data }: { data: CategoryApiResponse }) => {
  //    const router = useRouter()

  //    const {}
  console.log(data, 'id')

  return <CreateEditCrimeCategory response={data?.crime_category} />
}

export default EditCrimeCategoryPage

export async function getServerSideProps(ctx: any) {
  const { categoryId } = ctx.query

  const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/crime-category/${categoryId}`

  // Fetch data
  const res = await fetch(API_URL)

  // Parse the data
  const data = await res.json()
  const category = data

  // If the product is not found, return notFound - 404 page
  //   if (product === null) {
  //     return {
  //       notFound: true,
  //     };
  //   }

  // Return the product as props
  return {
    props: {
      data
    }
  }
}

EditCrimeCategoryPage.authGuard = true
