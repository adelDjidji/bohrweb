import { LayoutProps } from "../interfaces";
import UserService from "../services/UserService";

const RenderOnAuthenticated = (props: LayoutProps) =>
  UserService.isLoggedIn() ? props.children : null;

export default RenderOnAuthenticated;
