import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import { closeMessage } from "../actions"

export default function AlertMessage() {
  const message = useSelector((state: RootStateOrAny) => state.message)
  const dispatch = useDispatch()

  function handleClose() {
    dispatch(closeMessage())
  }

  return (
    <div>
      <Snackbar
        open={message.isOpen}
        autoHideDuration={10000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={message.severity}>
          {message.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}
