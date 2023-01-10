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
  const cursorRange = React.useRef<Range | null>(null)

  /* 使父组件可以拿到输入框的ref */
  React.useImperativeHandle(
    ref,
    () => {
      return {
        clickToFocus: () => inputRef.current?.focus(),
        inputValue: (): string => inputedValueRef.current
      }
    },
    []
  )

  /* 输入表情 */
  const emojiInput = (clickData: EmojiClickData) => {
    if (inputRef.current && cursorRange.current) {
      /* 获取一个 Selection 对象，表示用户选择的文本范围或光标的当前位置 */
      const range = document.getSelection()
      /* 创建一个node */
      const textNode = document.createTextNode(clickData.emoji)
      /* 创建一个新range对象 */
      const newRange = document.createRange()
      /* 将node插入到光标位置 */
      cursorRange.current?.insertNode(textNode)
      /* 将某个node包裹 */
      newRange.selectNodeContents(textNode)
      /* 光标移动至node末尾，true为开头 */
      newRange.collapse(false)
      range?.removeAllRanges()
      range?.addRange(newRange)

      /* 缓存一下光标位置 */
      handleCursorRange()
      /* 文本框内的文本缓存起来 */
      inputedValueRef.current = inputRef.current.innerText
      isShowPlaceHolder()
    }
  }
  /* 输入 onInput */
  const text_input: React.FormEventHandler<HTMLDivElement> = e => {
    const text: string = e.currentTarget.innerText
    inputedValueRef.current = text
    isShowPlaceHolder()
    handleCursorRange()
  }
  /* onkeyDown */
  const text_keyDown: React.KeyboardEventHandler<HTMLDivElement> = e => {
    handleCursorRange()
    const text = inputRef.current?.innerText
    if (e.key === "Enter" && !e.shiftKey) {
      /* 回车键发送 */
      e.preventDefault()
      if (text === "") return
      e.currentTarget.innerHTML = ""
      inputedValueRef.current = ""
      isShowPlaceHolder()
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

  /* 缓存光标位置 */
  const handleCursorRange = () => {
    const range = document.getSelection()
    const rangeIndex = range?.getRangeAt(0)
    cursorRange.current = rangeIndex!
  }
  return (
    <Container className="flex-r flex-jce flex-alc">
      <EditableElement
        contentEditable
        suppressContentEditableWarning
        onInput={text_input}
        onKeyDown={text_keyDown}
        ref={inputRef}
        onClick={handleCursorRange}
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
  user-select: none;

  &.inputting {
    display: none;
  }
`
