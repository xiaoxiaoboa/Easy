import React from "react"
import { SnackbarContext, defaultInterval } from "../components/Snackbar/Snackbar"

const useSnackbar = () => {
  const { openSnackbar, closeSnackbar } = React.useContext(SnackbarContext)

  const open = (text = "", duration = defaultInterval) => {
    openSnackbar(text, duration)
  }
  return [open, closeSnackbar]
}

export default useSnackbar
