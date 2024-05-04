import {
  NAV_ITEM_TYPE_TITLE,
  NAV_ITEM_TYPE_ITEM,
  NAV_ITEM_TYPE_COLLAPSE,
} from "@/constants/navigation.constant";
import { ADMIN, USER } from "@/constants/roles.constant";
import type { NavigationTree } from "@/@types/navigation";
import { AiOutlineShop } from "react-icons/ai";

const SalesNavigationConfig: NavigationTree[] = [
  {
    key: "sales",
    path: "",
    title: "sales",
    translateKey: "sales",
    icon: "product",
    type: NAV_ITEM_TYPE_TITLE,
    authority: [ADMIN, USER],
    subMenu: [
      {
        key: "sells.order.list",
        path: "/order-list",
        title: "Order List",
        translateKey: "Order List",
        icon: "product",
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        subMenu: [],
      },
    ],
  },
  {
    key: "offer.offerlist",
    path: "",
    title: "Offer List",
    translateKey: "OFFER",
    icon: "product",
    type: NAV_ITEM_TYPE_TITLE,
    authority: [ADMIN, USER],
    subMenu: [
      {
        key: "offer.offerlist",
        path: "/offer-list",
        title: "Offer List",
        translateKey: "Offer List",
        icon: "product",
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        subMenu: [],
      },
      {
        key: "subscriptionlist",
        path: "/subscription-list",
        title: "Subscription List",
        translateKey: "Subscription List",
        icon: "product",
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        subMenu: [],
      },
    ],
  },
];

export default SalesNavigationConfig;
