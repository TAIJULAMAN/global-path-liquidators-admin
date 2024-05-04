// import appsNavigationConfig from "./apps.navigation.config";
// import uiComponentNavigationConfig from './ui-components.navigation.config'
// import pagesNavigationConfig from './pages.navigation.config'
import productsNavigationConfig from "./products.navigation.config";
// import authNavigationConfig from './auth.navigation.config'
// import docNavigationConfig from './doc.navigation.config'
import type { NavigationTree } from "@/@types/navigation";
import profilesNavigationConfig from "./profiles.navigation.config";
import methodsNavigationConfig from "./methods.navigation.config";
import administrationsNavigationConfig from "./administration.navigation.config";
import dashboardNavigationConfig from "./dashboard.navigation.config";
import SalesNavigationConfig from "./Sales.navigation.config";

const navigationConfig: NavigationTree[] = [
  // ...appsNavigationConfig,
  // ...uiComponentNavigationConfig,
  // ...pagesNavigationConfig,
  ...dashboardNavigationConfig,
  ...productsNavigationConfig,
  ...SalesNavigationConfig,
  // ...authNavigationConfig,
  // ...docNavigationConfig,
  ...methodsNavigationConfig,
  ...profilesNavigationConfig,
  ...administrationsNavigationConfig,

];

export default navigationConfig;
