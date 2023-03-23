import React, { useEffect, useState } from "react"
import { Router, useLocation } from "@reach/router"
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
import PrivateRoute from "./components/PrivateRoute"
import PublicRoute from "./components/PublicRoute"

import PageOne from "./views/step"
import Marche from "./views/Marche"
import Analyses from "./views/Analyses"
import Previsions from "./views/Previsions"
import Portefeuille from "./views/Portefeuille"
import Historique from "./views/Historique"
import Gestion from "./views/Gestion"
import PasswordRecovery from "./views/PasswordRecovery"
import NotFoundPage from "../pages/404"

import ApiService from "./services/ApiService"
import { setCurrentUser } from "./redux/actions/auth"
import { useDispatch } from "react-redux"
import { navigate } from "gatsby"
import { fetchCompanies, fetchRoles } from "./redux/actions/commun"

import moment from "moment"
moment.locale("fr", {
  months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split(
    "_"
  ),
  monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split(
    "_"
  ),
  monthsParseExact: true,
  weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
  weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
  weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd D MMMM YYYY HH:mm",
  },
  calendar: {
    sameDay: "[Aujourd’hui à] LT",
    nextDay: "[Demain à] LT",
    nextWeek: "dddd [à] LT",
    lastDay: "[Hier à] LT",
    lastWeek: "dddd [dernier à] LT",
    sameElse: "L",
  },
  relativeTime: {
    future: "dans %s",
    past: "il y a %s",
    s: "quelques secondes",
    m: "une minute",
    mm: "%d minutes",
    h: "une heure",
    hh: "%d heures",
    d: "un jour",
    dd: "%d jours",
    M: "un mois",
    MM: "%d mois",
    y: "un an",
    yy: "%d ans",
  },
  dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
  ordinal: function (number) {
    return number + (number === 1 ? "er" : "e")
  },
  meridiemParse: /PD|MD/,
  isPM: function (input) {
    return input.charAt(0) === "M"
  },
  // In case the meridiem units are not separated around 12, then implement
  // this function (look at locale/id.js for an example).
  // meridiemHour : function (hour, meridiem) {
  //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
  // },
  meridiem: function (hours, minutes, isLower) {
    return hours < 12 ? "PD" : "MD"
  },
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4, // Used to determine first week of the year.
  },
})

export default () => {
  const [loading, setloading] = useState(false)
  const dispatch = useDispatch()
  const location = useLocation()

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    dispatch(setCurrentUser(null))
    window.location.href = "/login"
    // navigate("/app/login")
  }

  useEffect(() => {
    const PUBLIC_PATHS = [
      `/login`,
      "/subscribe",
      "/forget-password",
      "/password_recovery",
      "/activate",
      "/forgotPassword",
    ]
    const hasValidToken = async () => {
      try {
        setloading(true)
        const res = await ApiService.GetRoles()
        setloading(false)
      } catch (error) {
        console.log("exception ", error)
        logout()
      }
    }
    PUBLIC_PATHS.every(item=>location?.pathname.indexOf(item)<0) &&
    hasValidToken()
  }, [])

  if (loading) return null

  return (
    <Router>
      <NotFoundPage default />
      <PrivateRoute exact path="/" component={Dashboard} />
      <PrivateRoute superadmin={true} path="/users" component={Users} />
      <PrivateRoute superadmin={true} path="/clients" component={Clients} />
      <PrivateRoute path="/marche" component={Marche} />
      <PrivateRoute path="/analyses" component={Analyses} />
      <PrivateRoute path="/previsions" component={Previsions} />
      <PrivateRoute path="/portefeuille" component={Portefeuille} />
      <PrivateRoute path="/historique" component={Historique} />
      <PrivateRoute path="/manage" component={Gestion} />

      <PublicRoute path="/login" component={Login} />
      <PublicRoute path="/subscribe/:token" component={Register} />
      <PublicRoute path="/forget-password" component={ForgetPassword} />
      <PublicRoute
        path="/password_recovery/:token"
        component={PasswordRecovery}
      />
      <PublicRoute path="/subscribe" component={SubscireForm} />
      <PublicRoute path="/activate" component={ActivationForm} />
      <PublicRoute path="/forgotPassword" component={ForgotPasswordForm} />
    </Router>
  )
}
