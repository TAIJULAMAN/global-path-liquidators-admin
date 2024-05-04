import { lazy } from "react";
// import { PRO_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from "@/constants/roles.constant";
import type { Routes } from "@/@types/routes";

const administrationsRoute: Routes = [
  {
    key: "administrations.tickets.open",
    path: `/tickets-open`,
    component: lazy(() => import("@/views/Tickets/OpenTickets")),
    authority: [ADMIN, USER],
  },
  {
    key: "administrations.tickets.open",
    path: `/tickets-open/details/:id`,
    component: lazy(() => import("@/views/Tickets/ReplyTicket")),
    authority: [ADMIN, USER],
  },
  // {
  //   key: "administrations.tickets.close",
  //   path: `/tickets-close`,
  //   component: lazy(() => import("@/views/Tickets/ClosedTickets")),
  //   authority: [ADMIN, USER],
  // },
  {
    key: "administrations.promotions.referral-program",
    path: `/promotions/referral-program`,
    component: lazy(() => import("@/views/promotions/ReferalProgram")),
    authority: [ADMIN, USER],
  },
  {
    key: "administrations.promotions.generate-coupon",
    path: `/promotions/generate-coupon`,
    component: lazy(() => import("@/views/promotions/GenerateCoupon")),
    authority: [ADMIN, USER],
  },
  {
    key: "administrations.promotions.gpl-incentive-program",
    path: `/promotions/gpl-incentive-program`,
    component: lazy(() => import("@/views/promotions/GplIncentiveProgram")),
    authority: [ADMIN, USER],
  },
  {
    key: "administrations.marketing",
    path: "/marketing",
    component: lazy(() => import("@/views/Marketing/Marketing")),
    authority: [ADMIN, USER],
  },
  {
    key: "administrations.payment",
    path: "/payment",
    component: lazy(() => import("@/views/Payment/Payment")),
    authority: [ADMIN, USER],
  },
  {
    key: "administrations.settings.social-links",
    path: "/settings/social-links",
    component: lazy(() => import("@/views/settings/SocialLinks/SocialLinks")),
    authority: [ADMIN, USER],
  },

  {
    key: "administrations.settings.social-links",
    path: `/settings/social-links-edit/:id`,
    component: lazy(() => import("@/views/settings/SocialLinks/SocialLinkEdit")),
    authority: [ADMIN, USER],
  },




  {
    key: "administrations.settings.faq",
    path: "/settings/faq",
    component: lazy(() => import("@/views/settings/Faq/Faq")),
    authority: [ADMIN, USER],
  },

  {
    key: "administrations.settings.faq",
    path: "/settings/faq/edit/:id",
    component: lazy(() => import("@/views/settings/Faq/UpdateFaq")),
    authority: [ADMIN, USER],
  },
  {
    key: "administrations.settings.terms-conditions",
    path: "/settings/terms-conditions",
    component: lazy(
      () => import("@/views/settings/TermsAndConditions/TermsAndConditions")
    ),
    authority: [ADMIN, USER],
  },
  {
    key: "administrations.settings.terms-conditions",
    path: "/settings/terms-conditions-edit/:id",
    component: lazy(() => import("@/views/settings/TermsAndConditions/TermsConditionEdit")),
    authority: [ADMIN, USER],
  },
  {
    key: "administrations.settings.roles",
    path: `/settings/roles`,
    component: lazy(() => import("@/views/settings/Roles/Roles")),
    authority: [ADMIN, USER],
  },
  {
    key: "administrations.reports",
    path: "/reports",
    component: lazy(() => import("@/views/Reports/Report")),
    authority: [ADMIN, USER],
  },
  {
    key: "administrations.settings.system-settings",
    path: "/system-settings",
    component: lazy(() => import("@/views/settings/BasicSettings/Basicsettings")),
    authority: [ADMIN, USER],
  },
 


];

export default administrationsRoute;
