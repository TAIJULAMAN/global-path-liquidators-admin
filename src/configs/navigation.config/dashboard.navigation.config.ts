import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
} from '@/constants/navigation.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'

const dashboardNavigationConfig: NavigationTree[] = [
    {
        key: 'dashboard',
        path: '',
        title: 'Dashboard',
        translateKey: 'Dashboard',
        icon: 'profiles',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        subMenu: [
            {
                key: 'dashboard.dashboard',
                path: '/dashboard',
                title: 'Dashboard',
                translateKey: 'Dashboard',
                icon: 'dashboard',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [
                ],
            },
            // {
            //     key: 'dashboard.home-page',
            //     path: '/home-page',
            //     title: 'Home Page',
            //     translateKey: 'Home Page',
            //     icon: 'homePage',
            //     type: NAV_ITEM_TYPE_ITEM,
            //     authority: [ADMIN, USER],
            //     subMenu: [
            //     ],
            // }

        ],
    },
]

export default dashboardNavigationConfig
