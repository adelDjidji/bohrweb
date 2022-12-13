import { combineReducers } from "redux";
import users from "./users";
import message from "./message";

export default combineReducers({
  users,
  message,
});
