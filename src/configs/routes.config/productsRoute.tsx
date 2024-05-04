import { lazy } from "react";
import { PRO_PREFIX_PATH } from "@/constants/route.constant";
import { ADMIN, USER } from "@/constants/roles.constant";
import type { Routes } from "@/@types/routes";

const productsRoute: Routes = [
  {
    key: "products.product.manifest",
    path: `/manifest`,
    component: lazy(() => import("@/views/product/manifestlist/Manifest")),
    authority: [ADMIN, USER],
  },
  {
    key: "products.product.manifest",
    path: `/manifest-edit/:id`,
    component: lazy(() => import("@/views/product/manifestlist/ManifestEdit")),
    authority: [ADMIN, USER],
  },
  {
    key: "products.product.store",
    path: `/Store`,
    component: lazy(() => import("@/views/product/storelist/StoreList")),
    authority: [ADMIN, USER],
  },
  {
    key: "products.product.store",
    path: `/Store-edit/:id`,
    component: lazy(() => import("@/views/product/storelist/EditStore")),
    authority: [ADMIN, USER],
  },
  {
    key: "products.product.category",
    path: `${PRO_PREFIX_PATH}/category`,
    component: lazy(() => import("@/views/product/productCategory/category")),
    authority: [ADMIN, USER],
  },
  {
    key: "products.product.category",
    path: `${PRO_PREFIX_PATH}/category/edit/:category_id`,
    component: lazy(
      () => import("@/views/product/productCategory/CategoryEdit")
    ),
    authority: [ADMIN, USER],
  },

  {
    key: "products.product.condition",
    path: `${PRO_PREFIX_PATH}/condition`,
    component: lazy(() => import("@/views/product/condition/Conditions")),
    authority: [ADMIN, USER],
  },

  {
    key: "products.product.dealtype",
    path: `/add-deals`,
    component: lazy(() => import("@/views/product/productDeals/ProductDeals")),
    authority: [ADMIN, USER],
  },
  {
    key: "products.product.dealtype",
    path: `/deal-type/edit/:id`,
    component: lazy(
      () => import("@/views/product/productDeals/ProductDealEdit")
    ),
    authority: [ADMIN, USER],
  },

  {
    key: "products.product.condition",
    path: `${PRO_PREFIX_PATH}/condition/edit/:condition_id`,
    component: lazy(() => import("@/views/product/condition/ConditionEdit")),
    authority: [ADMIN, USER],
  },

  {
    key: "products.product.all",
    path: `/create-product`,
    component: lazy(() => import("@/views/product/products-list/Products")),
    authority: [ADMIN, USER],
  },
  {
    key: "products.product.all",
    path: `${PRO_PREFIX_PATH}/all-products`,
    component: lazy(() => import("@/views/product/products-list/productsList")),
    authority: [ADMIN, USER],
  },
  {
    key: "products.product.all",
    path: `${PRO_PREFIX_PATH}/all-products`,
    component: lazy(() => import("@/views/product/products-list/productsList")),
    authority: [ADMIN, USER],
  },
  {
    key: "products.product.all",
    path: `/product/edit/:id`,
    component: lazy(() => import("@/views/product/products-list/EditProduct")),
    authority: [ADMIN, USER],
  },

  {
    key: "products.product.case-store",
    path: `/case-store`,
    component: lazy(() => import("@/views/case-store/AllCasestore")),
    authority: [ADMIN, USER],
  },
  {
    key: "products.product.case-store-create",
    path: `/create-case-store`,
    component: lazy(() => import("@/views/case-store/CreateCaseStore")),
    authority: [ADMIN, USER],
  },
  {
    key: "products.product.case-store-update",
    path: `/case-store-edit/:id`,
    component: lazy(() => import("@/views/case-store/UpdateCaseStore")),
    authority: [ADMIN, USER],
  },

  {
    key: "products.product.pallet-deals",
    path: `${PRO_PREFIX_PATH}/pallet-deals`,
    component: lazy(() => import("@/views/pallet-deals/index")),
    authority: [ADMIN, USER],
  },
  {
    key: "products.pallet-deals.all",
    path: `/pallet-deals/products`,
    component: lazy(() => import("@/views/pallet-deals/ProductsTablePallet")),
    authority: [ADMIN, USER],
  },

  // pallet-deals
  {
    key: "products.pallet-deals.all",
    path: `/pallet-deals/products`,
    component: lazy(() => import("@/views/pallet-deals/ProductsTablePallet")),
    authority: [ADMIN, USER],
  },
  {
    key: "products.pallet-deals.new",
    path: `/pallet-deals/upload-new-products`,
    component: lazy(() => import("@/views/pallet-deals/CreatePalletProduct")),
    authority: [ADMIN, USER],
  },
  {
    key: "products.pallet-deals.all",
    path: `/pallet-deals/product/edit/:id`,
    component: lazy(() => import("@/views/pallet-deals/UpdatePalletProduct")),
    authority: [ADMIN, USER],
  },
  // truckload-deals
  {
    key: "products.truckload-deals.all",
    path: `/truckload-deals/products`,
    component: lazy(
      () => import("@/views/truckload-deals/ProductsTableTruckload")
    ),
    authority: [ADMIN, USER],
  },
  {
    key: "products.truckload-deals.new",
    path: `/truckload-deals/upload-new-products`,
    component: lazy(() => import("@/views/truckload-deals/CreateTruckload")),
    authority: [ADMIN, USER],
  },
  {
    key: "products.truckload-deals.all",
    path: `/truckload-deals/product/edit/:id`,
    component: lazy(() => import("@/views/truckload-deals/UpdateTruckload")),
    authority: [ADMIN, USER],
  },

  // bin store
  {
    key: "products.bin-store.all",
    path: `/bin-store/products`,
    component: lazy(() => import("@/views/bin-store/ProductsTableBinStore")),
    authority: [ADMIN, USER],
  },
  {
    key: "products.bin-store.new",
    path: `/bin-store/upload-new-products`,
    component: lazy(() => import("@/views/bin-store/CreateBinStoreProduct")),
    authority: [ADMIN, USER],
  },
  {
    key: "products.bin-store",
    path: `bin-store/product/edit/:id`,
    component: lazy(() => import("@/views/bin-store/UpdateBinStoreProduct")),
    authority: [ADMIN, USER],
  },
  {
    key: "products.auction-page",
    path: `/auction-page`,
    component: lazy(() => import("@/views/auction-page/AuctionPage")),
    authority: [ADMIN, USER],
  },

  {
    key: "products.auction-page-create",
    path: `/auction-product-create`,
    component: lazy(() => import("@/views/auction-page/CreateAuctionproduct")),
    authority: [ADMIN, USER],
  },
  {
    key: "products.auction-page",
    path: `/auction/product-edit/:id`,
    component: lazy(() => import("@/views/auction-page/AuctionEdit")),
    authority: [ADMIN, USER],
  },
  {
    key: "products.bid-page",
    path: `/all-bids`,
    component: lazy(() => import("@/views/auction-page/AllbidsList")),
    authority: [ADMIN, USER],
  },
  {
    key: "products.bid-page",
    path: `/bid-details/:id`,
    component: lazy(() => import("@/views/auction-page/Biddetails")),
    authority: [ADMIN, USER],
  },
  {
    key: "products.bid-page",
    path: `/bid-details/:id`,
    component: lazy(() => import("@/views/auction-page/Biddetails")),
    authority: [ADMIN, USER],
  },
  {
    key: "products.weekdays",
    path: `/all-weekdays`,
    component: lazy(() => import("@/views/product/weekDays/WeekDays")),
    authority: [ADMIN, USER],
  },
  {
    key: "products.weekdays",
    path: `/edit-weekday/:id`,
    component: lazy(() => import("@/views/product/weekDays/WeekdayEdit")),
    authority: [ADMIN, USER],
  },
  {
    key: "products.insentive",
    path: `/all-insentive-level`,
    component: lazy(() => import("@/views/product/insentiveLevel/Insentivelevel")),
    authority: [ADMIN, USER],
  },
  {
    key: "products.insentive",
    path: `/edit-all-insentive-level/:id`,
    component: lazy(() => import("@/views/product/insentiveLevel/Insentiveedit")),
    authority: [ADMIN, USER],
  },
  {
    key: "products.fefferal",
    path: `/all-referral`,
    component: lazy(() => import("@/views/product/Refferal/AllRefferal")),
    authority: [ADMIN, USER],
  },
];

export default productsRoute;
