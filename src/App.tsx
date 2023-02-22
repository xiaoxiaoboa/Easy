import React from "react"
import Routes from "./routes"
import ThemeProvider from "./theme/ThemeProvider"
import SnackbarProvider from "./components/Snackbar/Snackbar"
import { MyContextProvider } from "./context/context"
import Loading from "./components/Loading/Loading"

const App = () => {
  return (
    <MyContextProvider>
      <ThemeProvider>
        <SnackbarProvider>
          <Routes />
        </SnackbarProvider>
      </ThemeProvider>
    </MyContextProvider>
  )
}

export default App
