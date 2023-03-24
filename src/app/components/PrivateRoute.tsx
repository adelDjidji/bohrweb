import { FC, useEffect, useState } from "react"
import { navigate } from "gatsby"
import UserService from "../services/UserService"
import { RouteComponentProps } from "@reach/router"


type Props = RouteComponentProps<{
  component: any
  superadmin: boolean
}>
const PrivateRoute: FC<Props> = ({
  component: Component,
  location,
  superadmin = false,
  ...rest
}) => {
  
  const canAccess = superadmin
    ? UserService.isSuperadmin()
    : UserService.isLoggedIn()
  if (
    !canAccess && 
    location?.pathname !== `/app/login` &&
    location?.pathname !== `/app/register`
  ) {
    typeof window !== "undefined" && navigate("/app/login")
    return null
  }
  return <Component {...rest} />
}
export default PrivateRoute
