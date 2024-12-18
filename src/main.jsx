import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import {PersistGate} from 'redux-persist/integration/react'
import { Store, persistor } from "./Redux/Store.js";
createRoot(document.getElementById("root")).render(
  <>
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </>
);
