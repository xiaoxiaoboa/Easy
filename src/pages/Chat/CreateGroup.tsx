import React from "react"
import styled from "styled-components"
import { MyContext } from "../../context/context"
import { FixedSizeList as VirtualList } from "react-window"
import Avatar from "../../components/Avatar/Avatar"
import { FriendType } from "../../types/friend.type"
import Upload from "../../components/Upload"
import avatarImg from "../../assets/avatar.png"
import { ChatGroupType } from "../../types/chat.type"
import { nanoid } from "nanoid"
import { newGroup } from "../../api/chat_group.api"
import { ActionTypes } from "../../types/reducer"
import { MdClear } from "react-icons/md"

interface CheckType {
  checked: boolean
  friend: FriendType
}
interface GrougpChatProps {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>
}
const GrougpChat: React.FC<GrougpChatProps> = props => {
  const { handleClose } = props
  const { state, dispatch } = React.useContext(MyContext)
  const [checkState, setCheckState] = React.useState<CheckType[]>([])
  const [groupNumbers, setGroupNumbers] = React.useState<CheckType[]>([])
  const [avatar, setAvatar] = React.useState<File | null>(null)
  const [groupName, setGroupName] = React.useState<string>("")

  /* 加载好友 */
  React.useEffect(() => {
    const newData: CheckType[] = state.friends.map(item => ({
      friend: item,
      checked: false
    }))
    setCheckState(newData)
  }, [state.friends])
  React.useEffect(() => {
    setGroupNumbers(checkState.filter(item => item.checked === true))
  }, [checkState])

  /* 勾选好友 */
  const handleCheck = (id: string) => {
    const newData = checkState.map(item =>
      item.friend.friend_id === id ? { ...item, checked: !item.checked } : item
    )
    setCheckState(newData)
  }
  /* 群组头像 */
  const handleGroupAvatar: React.ChangeEventHandler<HTMLInputElement> = e => {
    const newFile = e.target.files
    console.log(newFile)
    if (newFile && newFile.length > 0) setAvatar(newFile[0])
  }

  const handleSubmit = () => {
    const newGroupData: ChatGroupType = {
      group_id: `g-${nanoid(13)}`,
      group_avatar: "",
      group_name: groupName,
      group_desc: "",
      group_owner: state.user_info?.result.user_id!
    }
    const newGroupNumbers = [...groupNumbers.map(item => item.friend.friend_id)]

    if (avatar) {
      newGroup(newGroupData, newGroupNumbers, avatar).then(val => {
        if (val.code === 1) {
          dispatch({
            type: ActionTypes.CONVERSATIONS,
            payload: [
              ...state.conversations,
              {
                conversation_id: nanoid(9),
                avatar: val.data.group_avatar,
                name: val.data.group_name,
                msg: "",
                user_name: "",
                isGroup: true,
                msg_length: 0
              }
            ]
          })
          handleClose(false)
        }
      })
    }
  }

  return (
    <Container className="flex-c flex-alc flex-jcc">
      <Wrapper className="flex">
        <CloseThis className="flex flex-alc click" onClick={() => handleClose(false)}>
          <MdClear size={22} />
        </CloseThis>
        <Left className="">
          <VirtualList
            className="virtuallist"
            height={480}
            width={280}
            itemCount={checkState.length}
            itemSize={80}
            itemData={checkState}
          >
            {({ data, index, style }) => (
              <FriendItem
                id={`${data[index]?.friend.friend_id}_${index}`}
                className="flex flex-alc"
                style={style}
              >
                <input
                  type="checkbox"
                  checked={data[index].checked}
                  id={`${data[index]?.friend.friend_id}_${index}`}
                  onChange={() => handleCheck(data[index].friend.friend_id)}
                />
                <FriendAvatar>
                  <Avatar src={data[index]?.friend.avatar} size="40" />
                </FriendAvatar>
                <FriendName>{data[index]?.friend.nick_name}</FriendName>
              </FriendItem>
            )}
          </VirtualList>
        </Left>
        <Right className="flex-c ">
          <Contacts className="flex-c">
            <h3>群组成员</h3>
            <ContactItemWrapper className="flex">
              {groupNumbers.map(item => (
                <ContactItem key={item.friend.friend_id} className="flex-c flex-alc">
                  <Avatar src={item.friend.avatar} size="40" />
                  <FriendName className="flex-c flex-alc">
                    {item.friend.nick_name}
                  </FriendName>
                </ContactItem>
              ))}
            </ContactItemWrapper>
          </Contacts>
          <Name className="flex-c">
            <h3>群组名称</h3>
            <NameInput className="flex flex-alc flex-jcc">
              <input type="text" onChange={e => setGroupName(e.target.value)} />
            </NameInput>
          </Name>
          <div className="flex-c" style={{ gap: "10px" }}>
            <h3>群组头像</h3>
            <div className="flex flex-alc flex-jcc" style={{ gap: "10px" }}>
              <Upload accept="image/*" id="group" handleChange={handleGroupAvatar}>
                <GroupAvatar className="flex">
                  <img src={avatar ? URL.createObjectURL(avatar) : avatarImg} alt="" />
                </GroupAvatar>
              </Upload>
            </div>
          </div>
          <div className="flex flex-jcc flex-alc" style={{ marginTop: "20px" }}>
            <SubmitBtn className="click" onClick={handleSubmit}>
              创建
            </SubmitBtn>
          </div>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default GrougpChat

const CloseThis = styled.div`
  position: absolute;
  top: 7px;
  right: 15px;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${p => p.theme.colors.nav_btn_bgcolor};

  /* &:hover {
    background-color: ${p => p.theme.colors.hovercolor};
  } */
`

const Container = styled.div`
  z-index: 3;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${p => p.theme.colors.publish_layer_color};

  .virtuallist {
    &::-webkit-scrollbar {
      display: none;
    }
  }
`

const Wrapper = styled.div`
  width: 800px;
  height: 500px;
  border-radius: 10px;
  position: relative;
  box-shadow: ${p => p.theme.colors.fd_boxshadow};
  background-color: ${p => p.theme.colors.nav_bg};
`

const Left = styled.div`
  overflow-y: auto;
  border-right: 1px solid #ccc;
  padding: 10px;
`
const FriendItem = styled.label`
  width: 100%;
  overflow: hidden;
  padding: 8px;
  gap: 10px;
  border-radius: 8px;

  & input {
    zoom: 120%;
  }

  &:hover {
    background-color: ${p => p.theme.colors.hovercolor};
  }
`
const FriendAvatar = styled.span``
const FriendName = styled.span`
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`
const Right = styled.div`
  flex: 1;
  padding: 10px;
  gap: 10px;
`
const Contacts = styled.div`
  max-height: 170px;
  gap: 10px;
`
const ContactItem = styled.div``
const ContactItemWrapper = styled.div`
  gap: 20px;
  flex-wrap: wrap;
  overflow: auto;
  min-height: 65px;
`
const Name = styled.div`
  gap: 10px;
`
const NameInput = styled.div`
  & input {
    outline: none;
    font-size: 18px;
    border: 1px solid transparent;
    border-radius: 20px;
    padding: 4px;
    width: 70%;
    background-color: ${p => p.theme.colors.inputbtn_bg};

    &:focus {
      border-color: ${p => p.theme.colors.primary};
    }
  }
`
const GroupAvatar = styled.div`
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid #ccc;
  cursor: pointer;

  & img {
    width: 120px;
    height: 120px;
    object-fit: cover;
  }
`
const SubmitBtn = styled.button`
  width: 80%;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border-radius: 4px;
  padding: 4px 0;
  cursor: pointer;
  background-color: ${p => p.theme.colors.primary};
`
