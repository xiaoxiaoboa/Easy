import { useRoutes } from "react-router-dom"
import Friends from "../pages/Friends/Friends"
import Home from "../pages/Home/Home"

const Routes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "friends",
      element: <Friends />
    }
  ])
  return routes
}

export default Routes
