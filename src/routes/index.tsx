import { Navigate, useRoutes } from "react-router-dom"
import MyApp from "../pages"
import Favorites from "../pages/Friends/Favorites"
import Friends from "../pages/Friends/Friends"
import Liked from "../pages/Friends/Liked"
import List from "../pages/Friends/List"
import Request from "../pages/Friends/Request"
import Home from "../pages/Home"
import Login from "../pages/Login/Login"
import Profile from "../pages/Profile"
import Moments from "../pages/Profile/Moments"
import Photos from "../pages/Profile/Photos"
import Videos from "../pages/Profile/Videos"
import RouterAuth from "../components/RouterAuth/RouterAuth"

const Routes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <MyApp />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "friends",
          element: (
            <RouterAuth>
              <Friends />
            </RouterAuth>
          ),
          children: [
            {
              path: "list",
              element: <List />
            },
            {
              path: "request",
              element: <Request />
            },
            {
              path: "favorites",
              element: <Favorites />
            },
            {
              path: "liked",
              element: <Liked />
            }
          ]
        },
        {
          path: "profile",
          element: (
            <RouterAuth>
              <Profile />
            </RouterAuth>
          ),
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
      ]
    },
    {
      path: "login",
      element: <Login />
    }
    // {
    //   path: "friends",
    //   element: <Friends />,
    //   children: [
    //     {
    //       path: "list",
    //       element: <List />
    //     },
    //     {
    //       path: "request",
    //       element: <Request />
    //     },
    //     {
    //       path: "favorites",
    //       element: <Favorites />
    //     },
    //     {
    //       path: "liked",
    //       element: <Liked />
    //     }
    //   ]
    // },
    // {
    //   path: "profile",
    //   element: <Profile />,
    //   children: [
    //     {
    //       path: "moments",
    //       element: <Moments />
    //     },
    //     {
    //       path: "photos",
    //       element: <Photos />
    //     },
    //     {
    //       path: "videos",
    //       element: <Videos />
    //     }
    //   ]
    // }
  ])
  return routes
}

export default Routes
