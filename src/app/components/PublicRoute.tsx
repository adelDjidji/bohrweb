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
    location?.pathname !== `/app` &&
    location?.pathname !== `/app/home` &&
    location?.pathname !== `/app/dashboard`
  ) {
    typeof window !== "undefined" && navigate("/app")
    return null
  }
  return <Component {...rest} />
}
export default PublicRoute
