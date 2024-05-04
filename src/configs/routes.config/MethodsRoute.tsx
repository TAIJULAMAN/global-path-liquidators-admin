import { lazy } from "react";
// import { PRO_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from "@/constants/roles.constant";
import type { Routes } from "@/@types/routes";

const MethodsRoute: Routes = [
  {
    key: "methods.shipping.delivery",
    path: `/shipping/delivery`,
    component: lazy(() => import("@/views/Shipping/Delivery")),
    authority: [ADMIN, USER],
  },
  {
    key: "methods.shipping.delivery",
    path: `/shipping/delivery/shipping-label-Details/edit/:id`,
    component: lazy(() => import("@/views/Shipping/ShippingLabelDetails")),
    authority: [ADMIN, USER],
  },
  {
    key: "methods.shipping.delivery",
    path: `/shipping/delivery/return-label-Details/edit/:id`,
    component: lazy(() => import("@/views/Shipping/ReturnLabelDetails")),
    authority: [ADMIN, USER],
  },
  {
    key: "methods.shipping.pick-up",
    path: `/shipping/pick-up`,
    component: lazy(() => import("@/views/Shipping/PickUp")),
    authority: [ADMIN, USER],
  },
  {
    key: "methods.shipping.pick-up",
    path: `/shipping/pick-up/edit/:id`,
    component: lazy(() => import("@/views/Shipping/PickupEdit")),
    authority: [ADMIN, USER],
  },
  {
    key: "methods.shipping.3rd-party",
    path: `/shipping/3rd-party-freight-ompanies`,
    component: lazy(() => import("@/views/Shipping/ThirdParty")),
    authority: [ADMIN, USER],
  },
  {
    key: "methods.payment",
    path: `/payment`,
    component: lazy(() => import("@/views/Payment/Payment")),
    authority: [ADMIN, USER],
  },

  {
    key: "methods.payment",
    path: `/payment/:id`,
    component: lazy(() => import("@/views/Payment/Paymentedit")),
    authority: [ADMIN, USER],
  },
  {
    key: "generate.coupon",
    path: `/generate-coupon`,
    component: lazy(() => import("@/views/coupon/GenerateCoupon")),
    authority: [ADMIN, USER],
  },
  {
    key: "promotionals",
    path: `/promotional-campaigns`,
    component: lazy(() => import("@/views/coupon/PromotionalCampaign")),
    authority: [ADMIN, USER],
  },

  {
    key: "generate.coupon",
    path: `/generate-coupon/:id`,
    component: lazy(() => import("@/views/coupon/CouponUpdate")),
    authority: [ADMIN, USER],
  },

  // {
  //     key: 'administrations.promotions.generate-coupon',
  //     path: `/promotions/generate-coupon`,
  //     component: lazy(
  //         () => import('@/views/promotions/GenerateCoupon'),
  //     ),
  //     authority: [ADMIN, USER],
  // },
  // {
  //     key: 'administrations.promotions.gpl-incentive-program',
  //     path: `/promotions/gpl-incentive-program`,
  //     component: lazy(() => import('@/views/promotions/GplIncentiveProgram')),
  //     authority: [ADMIN, USER],
  // },
  // {
  //     key: 'administrations.marketing',
  //     path:'/marketing',
  //     component: lazy(() => import('@/views/Marketing/Marketing')),
  //     authority: [ADMIN, USER],
  // },
  // {
  //     key: 'administrations.payment',
  //     path:'/payment',
  //     component: lazy(() => import('@/views/Payment/Payment')),
  //     authority: [ADMIN, USER],
  // },
];

export default MethodsRoute;
