import React from "react"
import { createStore } from "redux"
import { Provider } from "react-redux"
import { Router } from "@reach/router"

import rootReducer from "./reducers"
import Dashboard from "./views/Dashboard"
import TopBar from "./components/TopBar"
import Login from "./views/login"
import ForgetPassword from "./views/ForgetPassword"
import Register from "./views/Register"
import Users from "./views/Users"
import Clients from "./views/Clients"
import ActivationForm from "./components/ActivationForm"
import ForgotPasswordForm from "./components/ForgotPasswordForm"
import RenderOnAnonymous from "./components/RenderOnAnonymous"
import RenderOnAuthenticated from "./components/RenderOnAuthenticated"

import SubscireForm from "./components/subscribeForm"
import AlertMessage from "./components/AlertMessage"
import PrivateRoute from "./components/PrivateRoute"
import PublicRoute from "./components/PublicRoute"

import { ConfigProvider } from "antd"

import "react-toastify/dist/ReactToastify.css"
import "antd/dist/reset.css"
import PageOne from "./views/step"
import Marche from "./views/Marche"
import Analyses from "./views/Analyses"
import Previsions from "./views/Previsions"
import Portefeuille from "./views/Portefeuille"
import Historique from "./views/Historique"
import Gestion from "./views/Gestion"

const App: React.FC = () => {
  const store = createStore(rootReducer)
  return (
    <Provider store={store}>
      <TopBar />
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#5819f1",
          },
        }}
      >
        <Router>
          {/* <PrivateRoute path="/app/home" component={Dashboard} /> */}
          {/* <PrivateRoute path="/app/" component={Dashboard} /> */}
          <PublicRoute path="/app/users" component={Users} />
          <PublicRoute path="/app/clients" component={Clients} />

          <PublicRoute path="/app/step" component={PageOne} />
          <PublicRoute path="/app/dashboard" component={Dashboard} />
          <PublicRoute path="/app/marche" component={Marche} />
          <PublicRoute path="/app/analyses" component={Analyses} />
          <PublicRoute path="/app/previsions" component={Previsions} />
          <PublicRoute path="/app/portefeuille" component={Portefeuille} />
          <PublicRoute path="/app/historique" component={Historique} />
          <PublicRoute path="/app/manage" component={Gestion} />

          <PublicRoute path="/app/login" component={Login} />
          <PublicRoute path="/app/register" component={Register} />
          <PublicRoute path="/app/forget-password" component={ForgetPassword} />
          <PublicRoute path="/app/subscribe" component={SubscireForm} />
          <PublicRoute path="/app/activate" component={ActivationForm} />
          <PublicRoute
            path="/app/forgotPassword"
            component={ForgotPasswordForm}
          />
        </Router>
      </ConfigProvider>
      <AlertMessage />
    </Provider>
  )
}

export default App
