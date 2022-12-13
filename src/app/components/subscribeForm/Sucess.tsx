import { Box, Button, makeStyles, Typography } from "@material-ui/core"
import { navigate } from "@reach/router"

const useStyles = makeStyles(theme => ({
  box: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    marginTop: 30,
  },
}))
export const Success = () => {
  const classes = useStyles()
  return (
    <Box className={classes.box}>
      <Typography variant="h2" align="center">
        Merci!
      </Typography>
      <Typography component="p" align="center" className={classes.title}>
        Votre compte a été créé avec succès, verifier votre email pour activer
        votre compte
      </Typography>
      <Button
        style={{ marginLeft: 20, marginTop: 20 }}
        variant="contained"
        color="secondary"
        onClick={() => navigate("/app")}
      >
        Allez a l'accueil
      </Button>
    </Box>
  )
}
