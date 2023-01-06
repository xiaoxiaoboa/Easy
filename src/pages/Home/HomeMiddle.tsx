import React from "react"
import styled from "styled-components"
import Avatar from "../../components/Avatar/Avatar"
import { FiMoreHorizontal } from "react-icons/fi"
import { FaThumbsUp, FaRegThumbsUp, FaRegComment } from "react-icons/fa"
import { TiArrowForwardOutline } from "react-icons/ti"
import { MdDeleteForever } from "react-icons/md"
import { BiWinkSmile } from "react-icons/bi"
import temp from "../../assets/temp.jpg"
import Emoji from "../../components/Emoji"
import { EmojiClickData } from "emoji-picker-react"

const HomeMiddle = () => {
  return (
    <Container className="flex">
      <Wrapper className="flex-c flex-alc">
        <Publish />
        <FeedCard />
      </Wrapper>
    </Container>
  )
}

export default HomeMiddle

const Container = styled.div`
  flex: 4;
  padding: 0 0 30px 40px;
  /* overflow: hidden; */
`
const Wrapper = styled.div`
  width: 100%;
  height: max-content;
  padding-top: 20px;
  gap: 20px;
`

/* 顶部发布卡片 */
const Publish = () => {
  return (
    <PublishContainer className="flex-c">
      <div className="top flex-r flex-jcsb">
        <div className="avatar">
          <Avatar size="40" />
        </div>
        <div className="inputbtn flex-r flex-alc">Xiaoxin Yuan，分享你的瞬间把！</div>
      </div>
      <div className="division"></div>
      <div className="option flex-r flex-alc flex-jcc">
        <div className="photo flex-r flex-alc flex-jcc">
          <div className="photoicon"></div>
          照片
        </div>
        <div className="video flex-r flex-alc flex-jcc">
          <div className="videoicon"></div>
          视频
        </div>
        <div className="somebody flex-r flex-alc flex-jcc">
          <div className="somebodyicon"></div>
          @某人
        </div>
      </div>
    </PublishContainer>
  )
}
/* styled */
const PublishContainer = styled.div`
  width: 600px;
  border-radius: 8px;
  background-color: ${props => props.theme.colors.nav_bg};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  padding: 10px 20px;

  & .top {
    gap: 10px;
  }

  & .inputbtn {
    width: 510px;
    background-color: ${props => props.theme.colors.inputbtn_bg};
    border-radius: 24px;
    padding: 0 12px;
    cursor: pointer;
    color: ${props => props.theme.colors.inputbtn_color};

    &:hover {
      background-color: ${props => props.theme.colors.inputbtn_hoverbg};
    }
  }

  & .division {
    width: 100%;
    height: 1px;
    background-color: ${props => props.theme.colors.fd_divisioncolor};
    margin: 10px 0;
  }

  & .option {
    & .photo,
    & .video,
    & .somebody {
      width: 33%;
      gap: 8px;
      text-align: center;
      padding: 6px 8px;
      border-radius: 8px;
      cursor: pointer;

      &:hover {
        background-color: ${props => props.theme.colors.hovercolor};
      }
    }

    & .photoicon,
    & .videoicon,
    & .somebodyicon {
      width: 30px;
      height: 30px;
      background-repeat: no-repeat;
      background-size: 32px 222px;
      background-image: url(${props => props.theme.icon.icons});
    }
    & .photoicon {
      background-position: center 3px;
    }
    & .videoicon {
      background-position: center -160px;
    }
    & .somebodyicon {
      background-position: center -190px;
    }
  }
`

/* 帖子卡片 */
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
const Comment = () => {
  const [comments, setComment] = React.useState<string[]>([])
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
      console.log(inputedValueRef.current)
    }
  }
  /* 展开评论 */
  const handleClickUnfold: React.MouseEventHandler<HTMLParagraphElement> = e => {
    commentsRef.current?.classList.add("unfold")
    e.currentTarget.style.display = "none"
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
        <p onClick={handleClickUnfold}>查看剩余2条评论</p>
        <Comments className="flex-c" ref={commentsRef}>
          <AComment className="flex">
            <div className="avatar">
              <Avatar size="32" />
            </div>
            <div className="text flex-c">
              <span>Xiaoxin Yuan</span>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est earum odio
                minima esse minus deleniti ipsum voluptatibus rem! Atque at nam voluptas
                cupiditate veritatis, itaque et perspiciatis eligendi tempora magnam!
              </p>
            </div>
            <div className="delete click flex flex-alc">
              <span className="flex flex-alc">
                <MdDeleteForever size="18" className="MdDeleteForever" />
              </span>
            </div>
          </AComment>
          <AComment className="flex">
            <div className="avatar">
              <Avatar size="32" />
            </div>
            <div className="text flex-c">
              <span>Xiaoxin Yuan</span>
              <p>Hello</p>
            </div>
            <div className="delete click flex flex-alc">
              <span className="flex flex-alc">
                <MdDeleteForever size="18" className="MdDeleteForever" />
              </span>
            </div>
          </AComment>
        </Comments>
        <WriteComment className="flex-r flex-alc">
          <Avatar size="32" />
          <CommentInput className="flex-r flex-jce flex-alc">
            <div
              className="divinput"
              contentEditable
              suppressContentEditableWarning
              onInput={text_input}
              onKeyDown={text_keyDown}
              ref={inputRef}
            ></div>
            <span ref={placeholderRef}>写下你的评论把~</span>
            <Emoji onEmojiClick={emojiInput} />
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
  gap: 10px;
  background-color: ${props => props.theme.colors.inputbtn_bg};
  padding: 0 8px;
  border-radius: 22px;
  flex: 1;
  outline: none;
  white-space: pre-wrap;
  word-break: break-all;
  position: relative;

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
  height: 0;

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
