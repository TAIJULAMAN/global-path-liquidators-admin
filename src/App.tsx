import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store";
import Theme from "@/components/template/Theme";
import Layout from "@/components/layouts";
import mockServer from "./mock";
import appConfig from "@/configs/app.config";
import "./locales";

const environment = process.env.NODE_ENV;

if (appConfig.enableMock) {
  mockServer({ environment });
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Theme>
            <Layout />
          </Theme>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
