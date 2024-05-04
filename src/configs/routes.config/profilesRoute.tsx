import { lazy } from 'react'
import type { Routes } from '@/@types/routes'
import { PROFILE_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
const profilesRoute: Routes = [
    {
        key: 'profiles.admins.all',
        path: `/profiles/all/admins`,
        component: lazy(() => import('@/views/profile/admin/index')),
        authority: [],
    },
    {
        key: 'profiles.admins.new',
        path: `/profiles/create/admins`,
        component: lazy(() => import('@/views/profile/admin/createAdmin')),
        authority: [],
    },

    {
        key: 'profiles.admins.new',
        path: `/profiles/create/admin-role`,
        component: lazy(() => import('@/views/profile/adminRole/createRole')),
        authority: [ADMIN, USER],
    },
    {
        key: 'profiles.admins.new',
        path: `${PROFILE_PREFIX_PATH}/adminrole/edit/:role_id`,
        component: lazy(() => import('@/views/profile/adminRole/RoleEdit')),
        authority: [ADMIN, USER],
    },
    {
        key: 'profiles.customers',
        path: `/profiles/all/customers`,
        component: lazy(() => import('@/views/profile/customer/index')),
        authority: [],
    },
    {
        key: 'profiles.customers',
        path: `/profiles/create-customer`,
        component: lazy(
            () => import('@/views/profile/customer/createCustomer'),
        ),
        authority: [],
    },
]

export default profilesRoute
