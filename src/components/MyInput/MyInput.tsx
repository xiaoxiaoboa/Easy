import { EmojiClickData } from "emoji-picker-react"
import React from "react"
import styled from "styled-components"
import Emoji from "../../components/Emoji"
import { nanoid } from "nanoid"

interface Props {
  placeholder: string
}

const MyInput = React.forwardRef((props: Props, ref) => {
  const { placeholder } = props
  const placeholderRef = React.useRef<HTMLSpanElement>(null)
  const inputRef = React.useRef<HTMLDivElement>(null)
  const inputedValueRef = React.useRef<string>("")

  /* 使父组件可以拿到输入框的ref */
  React.useImperativeHandle(
    ref,
    () => {
      return {
        clickToFocus() {
          inputRef.current?.focus()
        }
      }
    },
    []
  )

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
    const text = inputRef.current?.innerText
    if (e.key === "Enter" && !e.shiftKey) {
      /* 回车键发送 */
      e.preventDefault()
      if (text === "") return
      const newComment = {
        id: nanoid(),
        content: text
      }
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
    <Container className="flex-r flex-jce flex-alc">
      <EditableElement
        contentEditable
        suppressContentEditableWarning
        onInput={text_input}
        onKeyDown={text_keyDown}
        ref={inputRef}
      ></EditableElement>
      <PlaceHolder ref={placeholderRef}>{placeholder}</PlaceHolder>
      <Emoji onEmojiClick={emojiInput} />
    </Container>
  )
})

export default MyInput

const Container = styled.div`
  width: 100%;
  gap: 10px;
  padding: 0 8px;
  position: relative;
`

const EditableElement = styled.div`
  width: 100%;
  max-width: 100%;
  line-height: 20px;
  outline: none;
  padding: 8px 0 8px 6px;
  font-size: 14px;
  max-height: 400px;
  overflow-y: auto;

  white-space: pre-wrap;
  word-break: break-all;
`
const PlaceHolder = styled.span`
  position: absolute;
  left: 14px;
  z-index: 0;
  color: ${props => props.theme.colors.secondary};

  &.inputting {
    display: none;
  }
`
