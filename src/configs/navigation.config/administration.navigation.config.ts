
import {
  NAV_ITEM_TYPE_TITLE,
  NAV_ITEM_TYPE_ITEM,
  NAV_ITEM_TYPE_COLLAPSE,
} from "@/constants/navigation.constant";
import { ADMIN, USER } from "@/constants/roles.constant";
import type { NavigationTree } from "@/@types/navigation";


const administrationsNavigationConfig: NavigationTree[] = [
  {
    key: 'administrations',
    path: '',
    title: 'administrations',
    translateKey: 'administrations',
    icon: 'product',
    type: NAV_ITEM_TYPE_TITLE,
    authority: [ADMIN, USER],
    subMenu: [
      // settings
      {
        key: 'administrations.settings',
        path: '',
        title: 'Settings',
        translateKey: 'Settings',
        icon: 'settings',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [ADMIN, USER],
        subMenu: [
          {
            key: 'administrations.settings.system-settings',
            path: `/system-settings`,
            title: 'System Settings',
            translateKey: 'System Settings',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [ADMIN, USER],
            subMenu: [],
          },
          {
            key: 'administrations.settings.social-links',
            path: `/settings/social-links`,
            title: 'Social Links',
            translateKey: 'Social Links',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [ADMIN, USER],
            subMenu: [],
          },
          {
            key: 'administrations.settings.faq',
            path: `/settings/faq`,
            title: 'FAQ',
            translateKey: 'FAQ',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [ADMIN, USER],
            subMenu: [],
          },
          {
            key: 'administrations.settings.terms-conditions',
            path: `/settings/terms-conditions`,
            title: 'Terms & Conditions',
            translateKey: 'Terms & Conditions',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [ADMIN, USER],
            subMenu: [],
          },
          {
            key: 'administrations.settings.roles',
            path: `/settings/roles`,
            title: 'Roles',
            translateKey: 'Roles',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [ADMIN, USER],
            subMenu: [],
          },
        ],
      },

      {
        key: 'administrations.messaging',
        path: '',
        title: 'Messaging',
        translateKey: 'Messaging',
        icon: 'messaging',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        subMenu: [],
      },
      {
        key: 'administrations.tickets',
        path: '',
        title: 'Tickets',
        translateKey: 'Tickets',
        icon: 'tickets',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [ADMIN, USER],
        subMenu: [
          {
            key: 'administrations.tickets.open',
            path: `/tickets-open`,
            title: 'All Tickets',
            translateKey: 'Open Tickets',
            icon: '',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [ADMIN, USER],
            subMenu: [],
          },

          // {
          //   key: 'administrations.tickets.close',
          //   path: `/tickets-close`,
          //   title: 'Closed Tickets',
          //   translateKey: 'Closed Tickets',
          //   icon: '',
          //   type: NAV_ITEM_TYPE_ITEM,
          //   authority: [ADMIN, USER],
          //   subMenu: [
          //   ],
          // },
        ],
      },
      {
        key: 'administrations.promotions',
        path: '',
        title: 'Promotions',
        translateKey: 'Promotions',
        icon: 'promotions',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [ADMIN, USER],
        subMenu: [

          {
            key: "products.insentive",
            path: `/all-insentive-level`,
            title: "All Insentive Level",
            translateKey: "All Insentive Level",
            icon: "",
            type: NAV_ITEM_TYPE_ITEM,
            authority: [ADMIN, USER],
            subMenu: [],
          },

          {
            key: "products.fefferal",
            path: `/all-referral`,
            title: "All Referral",
            translateKey: "All Referral",
            icon: "",
            type: NAV_ITEM_TYPE_ITEM,
            authority: [ADMIN, USER],
            subMenu: [],
          },

        ],
      },
      {
        key: 'administrations.marketing',
        path: '/marketing',
        title: 'Marketing',
        translateKey: 'Marketing',
        icon: 'marketing',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        subMenu: [],
      },
      {
        key: 'administrations.payment',
        path: '/payment',
        title: 'Payment',
        translateKey: 'Payment',
        icon: 'payment',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        subMenu: [],
      },
      {
        key: 'administrations.reports',
        path: '/reports',
        title: 'Reports',
        translateKey: 'Reports',
        icon: 'reports',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        subMenu: [],
      },



    ],
  },
]

export default administrationsNavigationConfig;