import { LayoutProps } from "../interfaces"
import UserService from "../services/UserService"

const RenderOnAnonymous = (props: LayoutProps) =>
  !UserService.isLoggedIn() ? props.children : null

export default RenderOnAnonymous
