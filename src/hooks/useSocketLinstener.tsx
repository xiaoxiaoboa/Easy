import React from "react"
import { queryUser } from "../api/user.api"
import { MyContext } from "../context/context"
import { RequestFriendsType } from "../types/friend.type"
import { BackNoticeType } from "../types/notice.type"
import { ActionTypes } from "../types/reducer"
import { UserType } from "../types/user.type"
import useSnackbar from "./useSnackbar"

const useSocketLinstener = () => {
  const { state, dispatch } = React.useContext(MyContext)
  const [openSnackbar] = useSnackbar()

  React.useEffect(() => {
    /* 监听好友请求 */
    state.socket?.notice.on("friendsRequest", (user: BackNoticeType<any>) => {
      setRequestFriends(user)
    })

    /* 监听未处理信息 */
    state.socket?.notice.on(
      `notice_${state.user_info?.result.user_id}`,
      (val: BackNoticeType<any>, callback) => {
        switch (val.notice.type) {
          case "0":
            setRequestFriends(val)
            break
          case "00":
            callback("我已收到")
            break
          default:
            break
        }
      }
    )

    return () => {
      state.socket?.notice.off("friendsRequest")
      state.socket?.notice.off("err")
      state.socket?.notice.off(`notice_${state.user_info?.result.user_id}`)
    }
  }, [])

  const setRequestFriends = (val: BackNoticeType<any>) => {
    const isExit = state.requestFriends.some(
      item => item.data.user_id === val.data.user_id
    )

    if (isExit) return

    dispatch({
      type: ActionTypes.REQUESTFRIENDS,
      payload: [...state.requestFriends, val]
    })
  }

  return
}

export default useSocketLinstener
