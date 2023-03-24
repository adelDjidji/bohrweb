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

import { Send, Mail, AccountCircleOutlined } from "@material-ui/icons"
import { navigate, RouteComponentProps } from "@reach/router"
import { errMessage, successMessage } from "../redux/actions"
import ApiService from "../services/ApiService"
import { useDispatch } from "react-redux"

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

type Props = RouteComponentProps<{}>
const LoginForm: FC<Props> = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [email, setEmail] = useState("")
  // const [refClient, setRefClient] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (name: string) => ({
    target: { value },
  }: {
    target: { value: string }
  }) => (setEmail(value.toLowerCase()) )

  const handleValidation = () => {
    return email.length > 0 && !validateEmail()
  }

  const handleKeyPress = (e: any) => {
    if (/enter/gi.test(e.key) && handleValidation()) {
      handleClick()
    }
  }

  const handleClick = () => {
    setIsLoading(true)
    ApiService.ForgotPassword({ email })
      .then(res => {
        dispatch(successMessage(res.data.message))
        navigate("/app/")
        setIsLoading(false)
      })
      .catch(err => {
        console.log("error : ", err)
        dispatch(errMessage(err.response.data.message))
        setIsLoading(false)
      })
  }

  const validateEmail = () => {
    if (email.length < 1) return false
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
  }

  // const validateRefClient = () => {
  //   if (refClient.length < 3) return false
  //   return true
  // }
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
          <CardHeader title="Reset mot de passe" />
          <CardContent>
            <TextField
              required
              id="email"
              label="Email"
              helperText="example@example.com"
              value={email}
              onChange={handleChange("email")}
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
            {/* <TextField
              required
              id="refClient"
              label="reference client"
              helperText="Votre reference client"
              value={refClient}
              onChange={handleChange("refClient")}
              onKeyDown={handleKeyPress}
              error={!validateRefClient()}
              margin="normal"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleOutlined />
                  </InputAdornment>
                ),
              }}
            /> */}
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
                Reset
              </Button>
            )}
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}

export default LoginForm
