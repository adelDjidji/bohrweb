import { FC, useState } from "react"
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  CardHeader,
  InputAdornment,
  makeStyles,
  Grid,
  CircularProgress,
} from "@material-ui/core"
import { Send, Lock } from "@material-ui/icons"

import { navigate, RouteComponentProps, useLocation } from "@reach/router"

import ApiService from "../services/ApiService"
import { useDispatch } from "react-redux"
import { errMessage, successMessage } from "../actions"

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
  },
  extendedIcon: {
    marginRight: theme.spacing(2),
  },
  action: {
    flexDirection: "row-reverse",
  },
}))
function useQuery() {
  return new URLSearchParams(useLocation().search)
}

type Props = RouteComponentProps<{}>
const LoginForm: FC<Props> = () => {
  const dispatch = useDispatch()

  const classes = useStyles()
  const query = useQuery()
  const token = query.get("token") || ""
  const resetCount = !!query.get("resetCount")
  const refClient = !!query.get("refClient")

  const [confirmPassword, setConfirmPassword] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (name: string) => ({
    target: { value },
  }: {
    target: { value: string }
  }) => (name === "password" ? setPassword(value) : setConfirmPassword(value))

  const handleValidation = () => {
    return (
      confirmPassword.length >= 6 &&
      password.length >= 6 &&
      confirmPassword === password
    )
  }

  const handleKeyPress = (e: any) => {
    if (/enter/gi.test(e.key) && handleValidation()) {
      handleClick()
    }
  }

  const handleClick = () => {
    setIsLoading(true)
    ApiService.SetPassword({ password, token, resetCount })
      .then(res => {
        dispatch(
          successMessage("Mot de passe mise a jour, vous pouvez vous conecter")
        )
        navigate("/app/login")
        setIsLoading(false)
      })
      .catch(err => {
        console.log("error : ", err)
        dispatch(errMessage(err.response.data.message))
        setIsLoading(false)
      })
  }
  if (!token) return <div></div>
  if (refClient) navigate("/forgotPassword")
  if (resetCount)
    ApiService.SetPassword({ token, resetCount })
      .then(res => {
        dispatch(
          successMessage("Vous pouvez réessayer votre ancien mot de passe")
        )
        navigate("/app/login")
      })
      .catch(err => {
        console.log("error : ", err)
        dispatch(errMessage(err.response.data.message))
      })

  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justify="center"
      style={{ minHeight: "90vh" }}
    >
      <Grid item xs={10} sm={4}>
        <Card className={classes.card}>
          <CardHeader />
          <CardContent>
            <TextField
              required
              id="password"
              label="Password"
              helperText=""
              value={password}
              type="password"
              onChange={handleChange("password")}
              onKeyDown={handleKeyPress}
              margin="normal"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              required
              id="confirmPassword"
              label="Confirm password"
              helperText=""
              value={confirmPassword}
              type="password"
              onChange={handleChange("confirmPassword")}
              onKeyDown={handleKeyPress}
              margin="normal"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
          </CardContent>
          <CardActions className={classes.action}>
            {isLoading ? (
              <CircularProgress color="secondary" />
            ) : (
              <Button
                id="btn_login"
                onClick={handleClick}
                disabled={!handleValidation()}
                color="primary"
                variant="contained"
              >
                <Send className={classes.extendedIcon} />
                C'est mon nouveau Mot de passe
              </Button>
            )}
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}

export default LoginForm
