import React from "react"
import { FiMoreHorizontal } from "react-icons/fi"
import Avatar from "../Avatar/Avatar"
import styled from "styled-components"
import { nanoid } from "nanoid"
import Emoji from "../../components/Emoji"
import { FaRegComment, FaRegThumbsUp } from "react-icons/fa"
import { TiArrowForwardOutline } from "react-icons/ti"
import { EmojiClickData } from "emoji-picker-react"
import { MdDeleteForever } from "react-icons/md"
import temp from "../../assets/temp.jpg"
import MyInput from "../MyInput/MyInput"

const FeedCard = () => {
  return (
    <FeedCardContainer>
      <FeedCardWrapper className="flex-c">
        <CardTop className="flex-r flex-alc">
          <Avatar size="40" />
          <div className="cardinfo flex-c">
            <div className="carduser">Xiaoxin Yuan</div>
            <div className="cardtimestamp">1分钟</div>
          </div>
          <div className="cardfun click flex-r flex-alc">
            <FiMoreHorizontal size="22" className="FiMoreHorizontal" />
          </div>
        </CardTop>
        <CardContent>
          <TextAndEmoj>Hello</TextAndEmoj>
          <PicAndVid className="flex flex-jcc">
            <img src={temp} alt="" />
          </PicAndVid>
        </CardContent>
        <CardFun />
        <Comment />
      </FeedCardWrapper>
    </FeedCardContainer>
  )
}

export default FeedCard

/* styled */
const FeedCardContainer = styled.div`
  width: 600px;
`
const FeedCardWrapper = styled.div`
  /* gap: 6px; */
  background-color: ${props => props.theme.colors.nav_bg};
  border-radius: 8px;
  box-shadow: ${props => props.theme.colors.fd_boxshadow};
`
const CardTop = styled.div`
  padding: 10px 20px;
  & .cardinfo {
    margin-left: 10px;
    gap: 4px;
  }
  & .carduser {
    font-size: 14px;
    font-weight: 500;
  }
  & .cardtimestamp {
    font-size: 12px;
    color: ${porps => porps.theme.colors.secondary};
  }
  & .cardfun {
    border-radius: 50%;
    cursor: pointer;
    padding: 6px;
    margin-left: auto;

    &:hover {
      background-color: ${props => props.theme.colors.hovercolor};
    }

    & .FiMoreHorizontal {
      color: ${porps => porps.theme.colors.secondary};
    }
  }
`
const CardContent = styled.div`
  width: 100%;
`
const TextAndEmoj = styled.div`
  height: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  padding: 0 20px 12px 20px;
`
const PicAndVid = styled.div``

/* card点赞、评论、分享功能 */
const CardFun = () => {
  return (
    <CardFunContainer className="flex flex-alc flex-jcc">
      <div className="like click flex flex-alc flex-jcc">
        <FaRegThumbsUp size="20" className="FaRegThumbsUp" />赞
      </div>
      <div className="comment flex flex-alc flex-jcc">
        <FaRegComment size="20" className="FaRegComment" />
        评论
      </div>
      <div className="share flex flex-alc flex-jcc">
        <TiArrowForwardOutline size="24" className="TiArrowForwardOutline" />
        分享
      </div>
    </CardFunContainer>
  )
}

/* styled */
const CardFunContainer = styled.div`
  width: 100%;
  gap: 4px;
  padding: 4px;
  position: relative;
  margin-bottom: 10px;

  & .like,
  & .comment,
  & .share {
    width: 185px;
    gap: 6px;
    padding: 6px 0;
    cursor: pointer;
    border-radius: 6px;
    color: ${props => props.theme.colors.secondary};

    &:hover {
      background-color: ${props => props.theme.colors.hovercolor};
    }
  }
  &::after {
    content: "";
    position: absolute;
    width: 567px;
    height: 1px;
    bottom: 0;
    background-color: ${props => props.theme.colors.fd_divisioncolor};
  }
`

/* 评论 */
type commentType = { id: string; content: string }
const Comment = () => {
  const [comments, setComment] = React.useState<commentType[]>([])
  const inputRef = React.useRef<HTMLDivElement>(null)
  const commentsRef = React.useRef<HTMLDivElement>(null)
  const placeholderRef = React.useRef<HTMLSpanElement>(null)
  const inputedValueRef = React.useRef<string>("")

  /* 输入表情 */
  const emojiInput = (clickData: EmojiClickData) => {
    if (inputRef.current) {
      inputedValueRef.current += clickData.emoji
      isShowPlaceHolder()
      inputRef.current.insertAdjacentText("beforeend", clickData.emoji)
      inputRef.current.focus()

      /* 将光标移动至文本最后 */
      const range = document.getSelection()
      range?.selectAllChildren(inputRef.current)
      range?.collapseToEnd()
    }
  }
  /* 输入评论 onInput */
  const text_input: React.FormEventHandler<HTMLDivElement> = e => {
    const text: string = e.currentTarget.innerText
    inputedValueRef.current = text
    isShowPlaceHolder()
  }
  /* onkeyDown */
  const text_keyDown: React.KeyboardEventHandler<HTMLDivElement> = e => {
    const text = e.currentTarget.innerText.trim()
    if (e.key === "Enter" && !e.shiftKey) {
      /* 回车键发送 */
      e.preventDefault()
      if (text === "") return
      const newComment = {
        id: nanoid(),
        content: text
      }
      setComment(prev => [...prev, newComment])
      e.currentTarget.innerHTML = ""
    }
  }
  /* 控制placeholder显示 */
  const isShowPlaceHolder = () => {
    /* 有输入时，placeholder隐藏；否则显示*/
    if (inputedValueRef.current === "") {
      placeholderRef.current?.classList.remove("inputting")
    } else {
      placeholderRef.current?.classList.add("inputting")
    }
  }

  return (
    <CommentContainer>
      <CommentWrapper className="flex-c">
        <p>查看剩余1条评论</p>
        <Comments className="flex-c" ref={commentsRef}>
          {comments.map(comment => (
            <AComment key={comment.id} className="flex">
              <div className="avatar">
                <Avatar size="32" />
              </div>
              <div className="text flex-c">
                <span>Xiaoxin Yuan</span>
                <p>{comment.content}</p>
              </div>
              <div className="delete click flex flex-alc">
                <span className="flex flex-alc">
                  <MdDeleteForever size="18" className="MdDeleteForever" />
                </span>
              </div>
            </AComment>
          ))}
        </Comments>
        <WriteComment className="flex-r flex-alc">
          <Avatar size="32" />
          <CommentInput className="flex-r flex-jce flex-alc">
            {/* <div
              className="divinput"
              contentEditable
              suppressContentEditableWarning
              onInput={text_input}
              onKeyDown={text_keyDown}
              ref={inputRef}
            ></div>
            <span ref={placeholderRef}>写下你的评论把~</span>
            <Emoji onEmojiClick={emojiInput} /> */}
            <MyInput placeholder="写下你的评论把~" />
          </CommentInput>
        </WriteComment>
      </CommentWrapper>
    </CommentContainer>
  )
}
/* styled */
const CommentContainer = styled.div``
const CommentWrapper = styled.div`
  padding: 0 15px;

  & > p {
    cursor: pointer;
    color: ${props => props.theme.colors.secondary};
    &:hover {
      text-decoration: underline;
    }
  }
`
const WriteComment = styled.div`
  gap: 10px;
  padding: 6px 0;
`
const CommentInput = styled.div`
  /* gap: 10px; */
  background-color: ${props => props.theme.colors.inputbtn_bg};
  /* padding: 0 8px; */
  border-radius: 22px;
  flex: 1;
  /* outline: none;
  white-space: pre-wrap;
  word-break: break-all;
  position: relative; */

  & .divinput {
    width: 100%;
    line-height: 20px;
    outline: none;
    padding: 8px 0 8px 6px;
    font-size: 14px;
  }

  & > span {
    position: absolute;
    left: 14px;

    &.inputting {
      display: none;
    }
  }
`
const Comments = styled.div`
  width: max-content;
  max-width: 100%;
  gap: 10px;
  overflow: hidden;

  &.unfold {
    height: auto;
  }
`
const AComment = styled.div`
  gap: 10px;

  &:hover {
    & .delete {
      & span {
        transform: scale(1);
      }
    }
  }

  & .text {
    padding: 10px;
    border-radius: 16px;
    background-color: ${props => props.theme.colors.inputbtn_bg};

    & span {
      font-size: 13px;
      font-weight: 500;
    }
    & p {
      font-size: 15px;
    }
  }

  & .delete {
    & span {
      padding: 6px;
      border-radius: 50%;
      cursor: pointer;
      transform: scale(0);

      &:hover {
        background-color: ${props => props.theme.colors.inputbtn_bg};
      }

      & .MdDeleteForever {
        color: ${props => props.theme.colors.secondary};
      }
    }
  }
`
