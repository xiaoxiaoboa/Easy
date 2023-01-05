import React from "react"
import styled from "styled-components"
import { BiWinkSmile } from "react-icons/bi"
import EmojiPicker, { Theme, EmojiStyle, EmojiClickData } from "emoji-picker-react"

interface Props {
  onEmojiClick: (clickData: EmojiClickData) => void
}

const Emoji: React.FC<Props> = props => {
  const { onEmojiClick } = props
  const emjiRef = React.useRef<HTMLDivElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  let timer: number = 0

  /* 点击表情图标时触发 */
  const handleClickEmojiIcon = () => {
    emojiLocationCalculation()
    emjiRef.current?.classList.add("emoji_active")
  }
  /* 鼠标离开表情图标或表情组件时触发 */
  const handleMouseLeave = () => {
    timer = setTimeout(() => {
      emjiRef.current?.classList.remove("emoji_active")
    }, 300)
  }
  /* 鼠标移入表情组件时触发 */
  const handleMouseEnterEmoji = () => {
    clearTimeout(timer)
  }

  /* 判断emoji组件到顶部的距离，根据距离改变位置 */
  const emojiLocationCalculation = () => {
    /* 触发时先重置位置 */
    emjiRef.current?.classList.remove("position_change")
    /* 获取表情图标到顶部距离，60是navbar的高度 */
    const containerY: number = containerRef.current?.getBoundingClientRect().top! - 60
    /* 获取emoji组件高度，包括组件到表情图标的距离 */
    const emojiH: number = Math.abs(emjiRef.current?.offsetTop!)

    /* 如果到顶部的距离 < 组件本身；则改变位置 */
    if (containerY < emojiH) {
      emjiRef.current?.classList.add("position_change")
    }
  }

  return (
    <Container
      className="flex flex-alc"
      ref={containerRef}
      onClick={handleClickEmojiIcon}
      onMouseLeave={handleMouseLeave}
    >
      <BiWinkSmile size="22" className="BiWinkSmile click" />
      <EmojiWrapper
        ref={emjiRef}
        onMouseEnter={handleMouseEnterEmoji}
        onMouseLeave={handleMouseLeave}
      >
        <EmojiPicker
          theme={Theme.LIGHT}
          emojiStyle={EmojiStyle.NATIVE}
          lazyLoadEmojis
          searchDisabled
          previewConfig={{ showPreview: false }}
          width={300}
          height={270}
          onEmojiClick={onEmojiClick}
        />
      </EmojiWrapper>
    </Container>
  )
}

export default Emoji

const Container = styled.div`
  width: max-content;
  height: max-content;
  cursor: pointer;
  position: relative;
  & .BiWinkSmile {
    color: ${props => props.theme.colors.fd_cardfuncolor};
  }
`

const EmojiWrapper = styled.div`
  position: absolute;
  bottom: calc(100% + 16px);
  right: 0;
  transform: scale(0);
  opacity: 0;
  transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
  transform-origin: bottom right;

  & .EmojiPickerReact {
    --epr-emoji-size: 22px;
    --epr-category-navigation-button-size: 24px;

    & .epr-body {
      &::-webkit-scrollbar {
        display: none;
      }
    }
    & .epr-category-nav {
      padding: 4px 0;
    }
  }

  &.emoji_active {
    transform: scale(1);
    opacity: 1;
  }
  &.position_change {
    bottom: unset;
    top: calc(100% + 16px);
    transform-origin: top right;
  }
`
