import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import users from "./users";
import commun from "./commun";
import dashboard from "./dashboard";
import marche from "./marche";
import analyse from "./analyse";
import portfolio from "./portfolio";
import outage from "./outage";
import invoices from "./invoices";
import contracts from "./contracts";
import forecast from "./forecast";
import sites from "./sites";

export default combineReducers({
  auth,
  message,
  users,
  commun,
  dashboard,
  marche,
  analyse,
  portfolio,
  outage,
  invoices,
  contracts,
  forecast,
  sites
});
