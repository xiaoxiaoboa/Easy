import React from "react"
import styled from "styled-components"
import { BiSearch, BiArrowBack } from "react-icons/bi"
import logo from "../../assets/logo.svg"
import { useNavigate } from "react-router-dom"

const TopBarLeft = () => {
  const [isInput, setIsInput] = React.useState<boolean>(false)
  const bottomRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  document.onclick = e => {
    if (e.target === bottomRef.current || e.target === inputRef.current) return
    if (isInput) setIsInput(false)
  }

  /* 处理点击输入框 */
  const handleClickInput = (): void => {
    if (isInput) return
    setIsInput(true)
  }

  return (
    <Container className="flex-c" isInput={isInput}>
      <LeftContainerTop className="flex-r flex-alc flex-jce" isInput={isInput}>
        <img src={logo} className="logo" />
        <div className="flex-r flex-alc flex-jcc close">
          <div className=" flex-r flex-alc flex-jcc closewrapper">
            <BiArrowBack size="20" color="#7a7a7a" />
          </div>
        </div>
        <Input isInput={isInput}>
          <InputWrapper className="flex-r flex-alc wrapper">
            <BiSearch size="20" color="#7a7a7a" className="BiSearch" />
            <input
              type="text"
              placeholder="搜索"
              className="input"
              onClick={handleClickInput}
              ref={inputRef}
            />
          </InputWrapper>
        </Input>
      </LeftContainerTop>
      <LeftContainerBottom ref={bottomRef} isInput={isInput}>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
      </LeftContainerBottom>
    </Container>
  )
}

export default React.memo(TopBarLeft)

/* styled */
interface ContainerStyleProps {
  isInput: boolean
}
const Container = styled.div<ContainerStyleProps>`
  position: relative;
  width: 310px;
`

interface LeftContainerTopStyleProps {
  isInput: boolean
}
const LeftContainerTop = styled.div<LeftContainerTopStyleProps>`
  position: relative;
  gap: 6px;

  & img {
    width: 60px;
    height: 60px;
  }

  &:focus-within {
    .wrapper {
      transform: translateX(-26px);
    }
  }

  & .logo {
    opacity: ${props => (props.isInput ? 0 : 1)};
    z-index: ${props => (props.isInput ? -1 : 1)};
    transition: opacity 0.1s linear;
  }

  & .close {
    width: 60px;
    height: 60px;
    position: absolute;
    left: 20px;
    opacity: ${props => (props.isInput ? 1 : 0)};
    transform: ${props => (props.isInput ? "translateX(-20px)" : "translateX(0)")};
    transition: transform 0.2s linear;
  }

  & .closewrapper {
    padding: 6px;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      background-color: ${props => props.theme.colors.nav_left_close};
    }
  }
`
interface LeftContainerBottomStyleProps {
  isInput: boolean
}
const LeftContainerBottom = styled.div<LeftContainerBottomStyleProps>`
  width: calc(100% + 10px);
  position: absolute;
  padding-top: 60px;
  top: 0;
  left: 0;
  z-index: -1;
  overflow: hidden;
  height: ${props => (props.isInput ? "auto" : 0)};
  background-color: ${props => props.theme.colors.nav_bg};
  border-radius: 0 0 10px 10px;
  box-shadow: ${props => props.theme.colors.nav_left_shadow};
  opacity: ${props => (props.isInput ? 1 : 0)};
`

interface LeftContainerInputStyleProps {
  isInput: boolean
}
const Input = styled.div<LeftContainerInputStyleProps>`
  border-radius: 20px;
  background-color: ${props => props.theme.colors.nav_inputbg};
  overflow: hidden;
`
const InputWrapper = styled.div`
  width: 280px;
  height: 40px;
  padding: 8px 10px;
  transition: transform 0.2s linear;

  & .input {
    width: 100%;
    height: 26px;
    outline: none;
    border: none;
    font-size: 16px;
    background-color: inherit;
    margin-left: 6px;
  }
`
