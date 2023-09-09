// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    // {
    //   title: 'Home',
    //   path: '/home',
    //   icon: 'tabler:smart-home'
    // },
    {
      title: 'Crimes',
      path: '/crimes',
      icon: 'mdi:handcuffs',
      auth: false
    },
    {
      title: 'Crime Category',
      path: '/crime-category',
      icon: 'mdi:robber',
      auth: false
    },

    // {
    //   title: 'Create Crime category',
    //   path: '/crime-category/create',
    //   icon: 'mdi:robber',
    //   auth: false
    // },

    {
      title: 'Users',
      path: '/user',
      icon: 'tabler:users',
      auth: false
    }

    // {
    //   title: 'Second Page',
    //   path: '/second-page',
    //   icon: 'tabler:mail'
    // },
    // {
    //   path: '/acl',
    //   action: 'read',
    //   subject: 'acl-page',
    //   title: 'Access Control',
    //   icon: 'tabler:shield'
    // }
  ]
}

export default navigation
