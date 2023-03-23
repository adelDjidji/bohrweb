import { FC } from "react"
import { navigate } from "gatsby"
import UserService from "../services/UserService"
import { RouteComponentProps } from "@reach/router"

type Props = RouteComponentProps<{
  component: any
}>
const PublicRoute: FC<Props> = ({
  component: Component,
  location,
  ...rest
}) => {
  if (
    UserService.isLoggedIn() &&
    location?.pathname !== `/` &&
    location?.pathname !== `/home` &&
    location?.pathname !== `/dashboard`
  ) {
    typeof window !== "undefined" && navigate("/")
    return null
  }
  return <Component {...rest} />
}
export default PublicRoute
