import React from "react"
import Routes from "./routes"
import ThemeProvider from "./theme/ThemeProvider"
import SnackbarProvider from "./components/Snackbar/Snackbar"

const App = () => {
  return (
    <ThemeProvider>
      <SnackbarProvider>
        <Routes />
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
