import {
  NAV_ITEM_TYPE_TITLE,
  NAV_ITEM_TYPE_ITEM,
  NAV_ITEM_TYPE_COLLAPSE,
} from "@/constants/navigation.constant";
import { ADMIN, USER } from "@/constants/roles.constant";
import type { NavigationTree } from "@/@types/navigation";

const methodsNavigationConfig: NavigationTree[] = [
  {
    key: "methods",
    path: "",
    title: "methods",
    translateKey: "methods",
    icon: "profiles",
    type: NAV_ITEM_TYPE_TITLE,
    authority: [ADMIN, USER],
    subMenu: [
      {
        key: "methods.payment",
        path: "/payment",
        title: "Payment",
        translateKey: "Payment",
        icon: "payment",
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        subMenu: [
          // {
          //     key: 'methods.payment',
          //     path: '/methods/create/admin-role',
          //     title: 'Admin Role',
          //     translateKey: 'Admin',
          //     icon: 'admin',
          //     type: NAV_ITEM_TYPE_COLLAPSE,
          //     authority: [ADMIN, USER],
          //     subMenu: [],
          // },
          // {
          //     key: 'methods.admins',
          //     path: '/methods/create/admins',
          //     title: 'All Admin',
          //     translateKey: 'Admin',
          //     icon: 'admin',
          //     type: NAV_ITEM_TYPE_COLLAPSE,
          //     authority: [ADMIN, USER],
          //     subMenu: [
          //     ],
          // },
        ],
      },
      {
        key: "generate.coupon",
        path: "/generate-coupon",
        title: "Generate Coupon",
        translateKey: "Generate Coupon",
        icon: "coupon",
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        subMenu: [
          // {
          //     key: 'methods.payment',
          //     path: '/methods/create/admin-role',
          //     title: 'Admin Role',
          //     translateKey: 'Admin',
          //     icon: 'admin',
          //     type: NAV_ITEM_TYPE_COLLAPSE,
          //     authority: [ADMIN, USER],
          //     subMenu: [],
          // },
          // {
          //     key: 'methods.admins',
          //     path: '/methods/create/admins',
          //     title: 'All Admin',
          //     translateKey: 'Admin',
          //     icon: 'admin',
          //     type: NAV_ITEM_TYPE_COLLAPSE,
          //     authority: [ADMIN, USER],
          //     subMenu: [
          //     ],
          // },
        ],
      },
      {
        key: "promotionals",
        path: "/promotional-campaigns",
        title: "Promotional Campaigns",
        translateKey: "Generate Coupon",
        icon: "pro_campaign",
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        subMenu: [
          // {
          //     key: 'methods.payment',
          //     path: '/methods/create/admin-role',
          //     title: 'Admin Role',
          //     translateKey: 'Admin',
          //     icon: 'admin',
          //     type: NAV_ITEM_TYPE_COLLAPSE,
          //     authority: [ADMIN, USER],
          //     subMenu: [],
          // },
          // {
          //     key: 'methods.admins',
          //     path: '/methods/create/admins',
          //     title: 'All Admin',
          //     translateKey: 'Admin',
          //     icon: 'admin',
          //     type: NAV_ITEM_TYPE_COLLAPSE,
          //     authority: [ADMIN, USER],
          //     subMenu: [
          //     ],
          // },
        ],
      },

      {
        key: "methods.shipping",
        path: "",
        title: "Shipping",
        translateKey: "Shipping",
        icon: "shipping",
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [ADMIN, USER],
        subMenu: [
          {
            key: "methods.shipping.delivery",
            path: `/shipping/delivery`,
            title: "Delivery",
            translateKey: "Delivery",
            icon: "",
            type: NAV_ITEM_TYPE_ITEM,
            authority: [ADMIN, USER],
            subMenu: [],
          },
          {
            key: "methods.shipping.pick-up",
            path: `/shipping/pick-up`,
            title: "Pick-up",
            translateKey: "Pick-up",
            icon: "",
            type: NAV_ITEM_TYPE_ITEM,
            authority: [ADMIN, USER],
            subMenu: [],
          },
          {
            key: "methods.shipping.3rd-party",
            path: `/shipping/3rd-party-freight-ompanies`,
            title: "3rd Party Freight Companies",
            translateKey: "3rd Party Freight Companies",
            icon: "",
            type: NAV_ITEM_TYPE_ITEM,
            authority: [ADMIN, USER],
            subMenu: [],
          },
        ],
      },
    ],
  },
];

export default methodsNavigationConfig;
