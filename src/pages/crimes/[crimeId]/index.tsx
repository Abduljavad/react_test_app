import { useGetSingleCrime } from '@services/crime/get-crime'
import CreateEditCrime from '@views/crimes/create-edit-crime'
import { useRouter } from 'next/router'

const EditCrimePage = ({ data }: { data: any }) => {
  const router = useRouter()
  const id = router.query.crimeId
  const { data: singleCrime } = useGetSingleCrime(router.query.crimeId as string)
  console.log(data && singleCrime, 'id')

  if (singleCrime) return <CreateEditCrime response={singleCrime} />
}

export default EditCrimePage

export async function getServerSideProps(ctx: any) {
  const { crimeId } = ctx.query

  const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/crimes/${crimeId}`

  // Fetch data
  const res = await fetch(API_URL)

  // Parse the data
  const data = await res.json()

  console.log(data, 'data')

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

EditCrimePage.authGuard = true
