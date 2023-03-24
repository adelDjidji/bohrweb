import { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"

import DashboardIcon from "@material-ui/icons/Dashboard"
import BatteryCharging90Icon from "@material-ui/icons/BatteryCharging90"
import PaymentIcon from "@material-ui/icons/Payment"
import PermIdentityIcon from "@material-ui/icons/PermIdentity"
import ReceiptIcon from "@material-ui/icons/Receipt"
import HelpIcon from "@material-ui/icons/Help"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"

import Button from "@material-ui/core/Button"

import { navigate, Link } from "@reach/router"
import { Drawer } from "@material-ui/core"

import CssBaseline from "@material-ui/core/CssBaseline"

import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"

import UserService from "../services/UserService"

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },

  button: {
    marginTop: theme.spacing(3),
    margin: theme.spacing(1),
    justifyContent: "start",
  },
  icons: {
    marginRight: theme.spacing(1),
  },
  arrow: {
    marginLeft: theme.spacing(1.5),
  },
}))

export default function PersistentDrawerLeft() {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />

      {UserService.isLoggedIn() && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
        >
          <ArrowForwardIosIcon className={classes.arrow} />
        </IconButton>
      )}

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ArrowBackIosIcon />
          </IconButton>
        </div>
        <Divider />
        <Button
          component={Link}
          to={"/app/dashboard"}
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
        >
          <DashboardIcon className={classes.icons} />
          Dashboard
        </Button>
        <Button
          component={Link}
          to={"/app/consommation"}
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
        >
          <BatteryCharging90Icon className={classes.icons} /> Consommation
        </Button>
        <Button
          component={Link}
          to={"/app/payments"}
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
        >
          <PaymentIcon className={classes.icons} />
          Payments
        </Button>
        <Button
          component={Link}
          to={"/app/informations"}
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
        >
          <PermIdentityIcon className={classes.icons} />
          Informations
        </Button>
        <Button
          component={Link}
          to={"/app/contrats"}
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
        >
          <ReceiptIcon className={classes.icons} />
          Contrats
        </Button>

        <Button
          component={Link}
          to={"/app/help"}
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
        >
          <HelpIcon className={classes.icons} />
          aide
        </Button>

        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          onClick={() => {
            localStorage.removeItem("token")
            navigate("/app/home")
          }}
        >
          <ExitToAppIcon className={classes.icons} />
          Déconnecter
        </Button>
      </Drawer>
    </div>
  )
}
