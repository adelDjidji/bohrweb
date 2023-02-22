import React from "react"
import { legacy_createStore as createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from "redux-persist"
import rootReducer from "./redux/reducers"
import AlertMessage from "./components/AlertMessage"

import { ConfigProvider } from "antd"

import "react-toastify/dist/ReactToastify.css"
import "antd/dist/reset.css"

import "./index.css"
import storage from "redux-persist/lib/storage" // defaults to localStorage for web
import { PersistGate } from "redux-persist/integration/react"
import Routes from "./Routes"

const persistConfig = {
  key: "bohr",
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, {}, applyMiddleware(thunk))
export const persistor = persistStore(store)

const App: React.FC = () => {
  
  persistor.persist();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <TopBar /> */}
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#5819f1",
            },
          }}
        >
          <Routes/>
        </ConfigProvider>
        <AlertMessage />
      </PersistGate>
    </Provider>
  )
}

export default App
