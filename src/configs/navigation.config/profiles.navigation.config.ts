import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from '@/constants/navigation.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'

const profilesNavigationConfig: NavigationTree[] = [
    {
        key: 'profiles',
        path: '',
        title: 'profiles',
        translateKey: 'profiles',
        icon: 'profiles',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        subMenu: [
            {
                key: 'profiles.admins',
                path: '',
                title: 'Admins',
                translateKey: 'Admins',
                icon: 'admin',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN, USER],
                subMenu: [
                    {
                        key: 'profiles.admins',
                        path: '/profiles/create/admin-role',
                        title: 'Admin Role',
                        translateKey: 'Admin',
                        icon: 'admin',
                        type: NAV_ITEM_TYPE_COLLAPSE,
                        authority: [ADMIN, USER],
                        subMenu: [],
                    },

                    {
                        key: 'profiles.admins',
                        path: '/profiles/create/admins',
                        title: 'All Admin',
                        translateKey: 'Admin',
                        icon: 'admin',
                        type: NAV_ITEM_TYPE_COLLAPSE,
                        authority: [ADMIN, USER],
                        subMenu: [
                            // {
                            //   key: "profiles.admins.all",
                            //   path: `/profiles/all/admins`,
                            //   title: "All Admins",
                            //   translateKey: "All Admins",
                            //   icon: "",
                            //   type: NAV_ITEM_TYPE_ITEM,
                            //   authority: [ADMIN, USER],
                            //   subMenu: [],
                            // },
                            // {
                            //   key: "profiles.admins.new",
                            //   path: `/profiles/create/admins`,
                            //   title: "Create Admin",
                            //   translateKey: "Create Admin",
                            //   icon: "",
                            //   type: NAV_ITEM_TYPE_ITEM,
                            //   authority: [ADMIN, USER],
                            //   subMenu: [],
                            // },
                        ],
                    },
                ],
            },
            {
                key: 'profiles.customers',
                path: '',
                title: 'Customers',
                translateKey: 'Customers',
                icon: 'customers',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN, USER],
                subMenu: [
                    {
                        key: 'profiles.customer.all',
                        path: `/profiles/all/customers`,
                        title: 'All Customer',
                        translateKey: 'All Customer',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],
                    },
                    {
                        key: 'profiles.customer.new',
                        path: `/profiles/create-customer`,
                        title: 'Create Customer',
                        translateKey: 'Create Customer',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        subMenu: [],
                    },
                ],
            },
        ],
    },
]

export default profilesNavigationConfig
