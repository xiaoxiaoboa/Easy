import React from "react"
import styled from "styled-components"
import Avatar from "../../../components/Avatar/Avatar"
import MyInput from "../../../components/MyInput/MyInput"
import { FiEdit } from "react-icons/fi"
import { ChatGroupType, Message_type } from "../../../types/chat.type"
import Mumbers, { MemberType } from "./Mumbers"
import { MySocket } from "../../../types"
import { MyContext } from "../../../context/context"
import { ActionTypes } from "../../../types/reducer"
import Upload from "../../../components/Upload"
import { updateAvatar } from "../../../api/chat_group.api"

interface EditGroupProps {
  group: ChatGroupType
}

const EditGroup: React.FC<EditGroupProps> = props => {
  const { group } = props
  const { state, dispatch } = React.useContext(MyContext)
  const [descEdit, setDescEdit] = React.useState<boolean>(false)
  const [nameEdit, setNameEdit] = React.useState<boolean>(false)
  const [groupData, setGroupData] = React.useState<MemberType[]>([])
  const descRef = React.useRef<HTMLDivElement | null>(null)
  const nameRef = React.useRef<HTMLDivElement | null>(null)
  const bottomHeadRef = React.useRef<HTMLDivElement | null>(null)
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const [avatar, setAvatar] = React.useState<File | null>(null)

  const msgTypeRef = React.useRef<Message_type | "">("")

  /* 获取群组成员 */
  React.useEffect(() => {
    state.socket?.group.emit("mumbers", group.group_id, (data: any) => {
      setGroupData(data)
    })
  }, [])

  /* 元素监听 */
  React.useEffect(() => {
    descRef.current?.addEventListener("blur", onBlurDesc)
    nameRef.current?.addEventListener("blur", onBlurName)
    nameRef.current?.addEventListener("keydown", nameKeyDown)
    bottomHeadRef.current?.addEventListener("click", onClick)

    return () => {
      descRef.current?.removeEventListener("blur", onBlurDesc)
      nameRef.current?.removeEventListener("blur", onBlurName)
      nameRef.current?.removeEventListener("keydown", nameKeyDown)
      bottomHeadRef.current?.removeEventListener("click", onClick)
    }
  }, [])
  React.useEffect(() => {
    if (descEdit) descRef.current?.focus()
    if (nameEdit) nameRef.current?.focus()
  }, [descEdit, nameEdit])

  const onBlurDesc = () => {
    setDescEdit(false)
    const text = descRef.current?.innerHTML.trim()
    state.socket?.group.emit(
      "update",
      group.group_id,
      { group_desc: text },
      (res: any, err: any) => {
        if (res) {
          dispatch({
            type: ActionTypes.GROUPS,
            payload: state.groups.map(i => {
              if (i.group_id === group.group_id) {
                return { ...i, group_desc: text! }
              } else {
                return i
              }
            })
          })
        } else {
          console.log(err)
        }
      }
    )
  }
  const onBlurName = () => {
    setNameEdit(false)
    const text = nameRef.current?.innerHTML.trim()
    state.socket?.group.emit(
      "update",
      group.group_id,
      { group_name: text },
      (res: any, err: any) => {
        if (res) {
          dispatch({
            type: ActionTypes.CONVERSATIONS,
            payload: [
              ...state.conversations.map(i => {
                if (i.conversation_id === group.group_id) {
                  return { ...i, name: text! }
                } else {
                  return i
                }
              })
            ]
          })
          dispatch({
            type: ActionTypes.CURRENT_TALK,
            payload: {
              ...state.current_talk!,
              ...{
                name: text!
              }
            }
          })
          dispatch({
            type: ActionTypes.GROUPS,
            payload: state.groups.map(i => {
              if (i.group_id === group.group_id) {
                return { ...i, group_name: text! }
              } else {
                return i
              }
            })
          })
        } else {
          console.log(err)
        }
      }
    )
  }
  const nameKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault()
    }
  }
  const onClick = (e: any) => {
    const children = Array.from(bottomHeadRef.current?.children!)
    e.target.setAttribute("data-tag-active", "active")
    for (const i of children) {
      if (i !== e.target && i.hasAttribute("data-tag-active")) {
        i.removeAttribute("data-tag-active")
      }
    }
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    if (e.target.files) {
      setAvatar(e.target.files[0])
      updateAvatar(group.group_id, e.target.files[0]).then(val => {
        if (val.code === 1) {
          dispatch({
            type: ActionTypes.CURRENT_TALK,
            payload: {
              ...state.current_talk!,
              avatar: val.data
            }
          })
          dispatch({
            type: ActionTypes.CONVERSATIONS,
            payload: [
              ...state.conversations.map(i => {
                if (i.conversation_id === state.current_talk?.conversation_id) {
                  return { ...i, avatar: val.data }
                } else {
                  return i
                }
              })
            ]
          })
          dispatch({
            type: ActionTypes.GROUPS,
            payload: [
              ...state.groups.map(i => {
                if (i.group_id === state.current_talk?.conversation_id) {
                  return { ...i, group_avatar: val.data }
                } else {
                  return i
                }
              })
            ]
          })
        }
      })
    }
  }

  return (
    <Container className="flex" ref={containerRef}>
      <Wrapper className="flex-c">
        <Top className="flex-c flex-alc">
          <div className="flex">
            <Upload accept="image/*" id={group.group_id} handleChange={handleChange}>
              {avatar ? (
                <AvatarWrapper className="flex">
                  <img src={URL.createObjectURL(avatar)} />
                </AvatarWrapper>
              ) : (
                <Avatar src={group.group_avatar} size="70" />
              )}
            </Upload>
          </div>
          <Name className="flex flex-alc flex-jcc">
            <div
              style={{ gap: "10px" }}
              contentEditable={nameEdit}
              ref={nameRef}
              suppressContentEditableWarning
            >
              {group?.group_name}
            </div>
            <EditBtn title="点击编辑" onClick={() => setNameEdit(true)}>
              <FiEdit size={18} />
            </EditBtn>
          </Name>
          <Desc className="flex">
            <div
              style={{ gap: "10px" }}
              contentEditable={descEdit}
              ref={descRef}
              suppressContentEditableWarning
            >
              {group?.group_desc ? group?.group_desc : "添加群组简介"}
            </div>
            <EditBtn title="点击编辑" onClick={() => setDescEdit(true)}>
              <FiEdit size={18} />
            </EditBtn>
          </Desc>
        </Top>
        <Bottom className="flex-c">
          <BottomHead className="flex flex-alc" ref={bottomHeadRef}>
            <span data-tag-active="active">成员</span>
            <span>图片视频</span>
            <span>文件</span>
          </BottomHead>
          <BottomData>
            <ShowData data={groupData}>
              {({ item, index }) => {
                switch (msgTypeRef.current) {
                  default:
                    return <Mumbers key={index} data={item} />
                }
              }}
            </ShowData>
          </BottomData>
        </Bottom>
      </Wrapper>
    </Container>
  )
}

export default EditGroup

interface ShowDataProps {
  data: any[]
  children: ({ item, index }: { item: any; index: number }) => React.ReactNode
}
const ShowData: React.FC<ShowDataProps> = props => {
  const { data, children } = props
  return <div>{data.map((item, index) => children({ item, index }))}</div>
}

const Container = styled.div`
  height: 100%;
  flex: 0.5;
  border-left: 1px solid #ccc;
  overflow-y: auto;
  background-color: ${p => p.theme.colors.bgcolor};

  &::-webkit-scrollbar {
    display: none;
  }
`
const Wrapper = styled.div`
  width: 100%;
  gap: 10px;
  &::-webkit-scrollbar {
    display: none;
  }
`
const Top = styled.div`
  flex: 1;
  gap: 10px;
  padding: 10px 8px 10px 10px;
  background-color: ${p => p.theme.colors.nav_bg};
`
const AvatarWrapper = styled.div`
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid #ccc;

  & img {
    width: 70px;
    height: 70px;
    object-fit: cover;
  }
`
const Name = styled.div`
  width: 100%;

  &:hover {
    & span {
      visibility: visible;
    }
  }

  & div {
    margin-left: 22px;
  }

  & [contentEditable="false"] {
    max-width: 60%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 20px;
    font-weight: bold;
  }
  & [contentEditable="true"] {
    padding: 0 10px;
  }
  & [contentEditable="true"] + span {
    visibility: hidden !important;
  }
`
const Desc = styled.div`
  margin-top: 10px;
  flex-wrap: wrap;

  &:hover {
    & span {
      visibility: visible;
    }
  }
  & [contentEditable="true"] {
    padding: 0 10px;
  }
  & div {
    white-space: pre-wrap;
    word-wrap: break-word;
    margin-left: 22px;
    color: ${p => p.theme.colors.secondary};
  }
  & [contentEditable="true"] + span {
    visibility: hidden !important;
  }
`
const EditBtn = styled.span`
  display: inline-flex;
  visibility: hidden;
  cursor: pointer;
  margin-left: 4px;
  &:hover {
    color: ${p => p.theme.colors.primary};
  }
`
const Bottom = styled.div`
  flex: 1;
  gap: 10px;

  background-color: ${p => p.theme.colors.nav_bg};
`
const BottomHead = styled.div`
  background-color: ${p => p.theme.colors.nav_bg};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  z-index: 1;
  position: sticky;
  top: -1px;

  & [data-tag-active="active"] {
    font-weight: bold;
    color: ${p => p.theme.colors.primary};
    &::after {
      transform: translateY(0);
    }
  }
  & span {
    flex: 1;
    padding: 20px 10px;
    text-align: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &::after {
      content: "";
      transform: translateY(100%);
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      width: 100%;
      transition: transform 0.2s ease-in-out;
      background-color: ${p => p.theme.colors.primary};
    }

    &:hover {
      background-color: ${p => p.theme.colors.hovercolor};
    }
  }
`
const BottomData = styled.div`
  padding: 0 10px 10px 10px;
`
