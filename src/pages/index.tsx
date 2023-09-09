import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Home = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/user')
  }, [router])

  return <>Home Page</>
}

export default Home
