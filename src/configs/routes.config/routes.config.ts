import authRoute from "./authRoute";
import appsRoute from "./appsRoute";
import uiComponentsRoute from "./uiComponentsRoute";
import pagesRoute from "./pagesRoute";
import productsRoute from "./productsRoute";
import authDemoRoute from "./authDemoRoute";
import docsRoute from "./docsRoute";
import type { Routes } from "@/@types/routes";
import profilesRoute from "./profilesRoute";
import administrationsRoute from "./administrationsRoute";
import MethodsRoute from "./MethodsRoute";
import SalesRoute from "./SalesRoute";

export const publicRoutes: Routes = [...authRoute];

export const protectedRoutes: Routes = [
  ...appsRoute,
  ...uiComponentsRoute,
  ...pagesRoute,
  ...productsRoute,
  ...authDemoRoute,
  ...docsRoute,
  ...profilesRoute,
  ...administrationsRoute,
  ...MethodsRoute,
  ...SalesRoute,
];
