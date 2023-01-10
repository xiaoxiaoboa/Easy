import { useRoutes } from "react-router-dom"
import Friends from "../pages/Friends/Friends"
import Home from "../pages/Home"
import Profile from "../pages/Profile"
import Moments from "../pages/Profile/Moments"
import Photos from "../pages/Profile/Photos"
import Videos from "../pages/Profile/Videos"

const Routes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "friends",
      element: <Friends />
    },
    {
      path: "profile",
      element: <Profile />,
      children: [
        {
          path: "moments",
          element: <Moments />
        },
        {
          path: "photos",
          element: <Photos />
        },
        {
          path: "videos",
          element: <Videos />
        }
      ]
    }
  ])
  return routes
}

export default Routes
