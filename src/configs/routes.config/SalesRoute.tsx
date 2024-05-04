import { lazy } from "react";
// import { PRO_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from "@/constants/roles.constant";
import type { Routes } from "@/@types/routes";

const SalesRoute: Routes = [
  {
    key: "sells.order.list",
    path: `/order-list`,
    component: lazy(() => import("@/views/OrderList/OrderList")),
    authority: [ADMIN, USER],
  },
  {
    key: "offer.offerlist",
    path: `/offer-list`,
    component: lazy(() => import("@/views/offer/OfferInfo")),
    authority: [ADMIN, USER],
  },

  {
    key: "subscriptionlist",
    path: `/subscription-list`,
    component: lazy(() => import("@/views/subscription/AllSubscription")),
    authority: [ADMIN, USER],
  },
  {
    key: "subscriptionlist",
    path: `/edit-subscription/:id`,
    component: lazy(() => import("@/views/subscription/EditSubscription")),
    authority: [ADMIN, USER],
  },

  {
    key: "sells.order.details",
    path: `/order-list/details/:id`,
    component: lazy(
      () => import("@/views/OrderList/OrderDetails/OrderDetails")
    ),
    authority: [ADMIN, USER],
  },
];

export default SalesRoute;
