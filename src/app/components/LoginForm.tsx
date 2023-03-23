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
import { Send, Mail, Lock } from "@material-ui/icons"
import { errMessage, successMessage } from "../redux/actions"
import ApiService from "../services/ApiService"
import { useDispatch } from "react-redux"
import { navigate, Link } from "@reach/router"

import formValidation, { fieldsValidation } from "../utils/formValidation"

import { RouteComponentProps } from "@reach/router"

type Props = RouteComponentProps<{}>
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
  forgotPassword: {
    margin: "auto",
  },
}))

const LoginForm: FC<Props> = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (name: string) => ({
    target: { value },
  }: {
    target: { value: string }
  }) => (name === "username" ? setUsername(value) : setPassword(value))

  const handleValidation = () => {
    return (
      username.length > 0 &&
      !formValidation("email", username, fieldsValidation) &&
      password.length >= 6
    )
  }

  const handleKeyPress = (e: any) => {
    if (/enter/gi.test(e.key) && handleValidation()) {
      handleClick()
    }
  }

  const handleClick = () => {
    setIsLoading(true)
    ApiService.Login({ username, password })
      .then(res => {
        if (res.data.token !== undefined){
          localStorage.setItem("token", res.data.token)
          dispatch(successMessage("Vous etes a present connecté"))
          navigate("/")
          setIsLoading(false)
        }
        else{
          dispatch(successMessage(res.data.info.message))
          setIsLoading(false)
        }
          
      })
      .catch(err => {
        console.log("error : ", err)
        dispatch(errMessage(err.response.data.message))
        setIsLoading(false)
      })
  }

  const validateEmail = () => {
    if (username.length < 1) return false
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(username)
  }

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
          <CardHeader title="Login" />
          <CardContent>
            <TextField
              required
              id="email"
              label="Email"
              helperText="example@example.com"
              value={username}
              onChange={handleChange("username")}
              onKeyDown={handleKeyPress}
              error={validateEmail()}
              margin="normal"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail />
                  </InputAdornment>
                ),
              }}
            />
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
                Login
              </Button>
            )}
            <Link className={classes.forgotPassword} to={"/forgotPassword"}>
              J'ai oublié mon mot de passe
            </Link>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}

export default LoginForm
