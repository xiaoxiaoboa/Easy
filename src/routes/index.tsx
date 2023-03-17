import React from "react"
import { Navigate, useRoutes } from "react-router-dom"
import Loading from "../components/Loading/Loading"
import RouterAuth from "../components/RouterAuth/RouterAuth"
import MyApp from "../pages"
import Favorites from "../pages/Friends/Favorites"
import Friends from "../pages/Friends/Friends"
import List from "../pages/Friends/List"
import Chat from "../pages/Chat/Chat"
import Message from "../pages/Chat/Message"
import Home from "../pages/Home"
import Login from "../pages/Login/Login"
import Profile from "../pages/Profile"
import Moments from "../pages/Profile/Moments"
import Photos from "../pages/Profile/Photos"
import Videos from "../pages/Profile/Videos"
import Group from "../pages/Friends/Group"
// const MyApp = React.lazy(() => import("../pages"))
// const Favorites = React.lazy(() => import("../pages/Friends/Favorites"))
// const Friends = React.lazy(() => import("../pages/Friends/Friends"))
// const Liked = React.lazy(() => import("../pages/Friends/Liked"))
// const List = React.lazy(() => import("../pages/Friends/List"))
// const Request = React.lazy(() => import("../pages/Friends/Request"))
// const Home = React.lazy(() => import("../pages/Home"))
// const Login = React.lazy(() => import("../pages/Login/Login"))
// const Profile = React.lazy(() => import("../pages/Profile"))
// const Moments = React.lazy(() => import("../pages/Profile/Moments"))
// const Photos = React.lazy(() => import("../pages/Profile/Photos"))
// const Videos = React.lazy(() => import("../pages/Profile/Videos"))
// const RouterAuth = React.lazy(() => import("../components/RouterAuth/RouterAuth"))

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
              path: "group",
              element: <Group />
            },
            {
              path: "favorites",
              element: <Favorites />
            }
          ]
        },
        {
          path: "profile/:user_id",
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
        },
        {
          path: "chat",
          element: <Chat />,
          children: [
            {
              path: "message/:id",
              element: <Message />
            }
          ]
        }
      ]
    },
    {
      path: "/login",
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
