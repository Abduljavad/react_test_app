// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()
  console.log(router.asPath, 'path')

  const paths = ['/user/', '/crime-category/', '/crime-category/create/']

  useEffect(
    () => {
      // if (!router.isReady) {
      //   return
      // }

      if (!window.localStorage.getItem('token') && paths.includes(router.asPath)) {
        router.replace('/login')
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route]
  )

  if (auth.loading) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
