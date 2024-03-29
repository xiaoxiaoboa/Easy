import React from "react"
import styled from "styled-components"
import { BiSearch, BiArrowBack } from "react-icons/bi"
import logo from "../../assets/logo.svg"
import { NavLink } from "react-router-dom"

const TopBarLeft = () => {
  const [isInput, setIsInput] = React.useState<boolean>(false)
  const bottomRef = React.useRef<HTMLDivElement>(null)

  return (
    <Container
      className="flex-c flex-jcc"
      isInput={isInput}
    >
      <LeftContainerTop
        className="flex-r flex-alc flex-jce"
        isInput={isInput}
      >
        <NavLink
          to={"/"}
          className="logo flex"
        >
          <img src={logo} />
        </NavLink>
        <div className="flex-r flex-alc flex-jcc close">
          <div className=" flex-r flex-alc flex-jcc closewrapper">
            <BiArrowBack
              size="20"
              className="BiArrowBack"
            />
          </div>
        </div>
        <Input isInput={isInput}>
          <InputWrapper className="flex-r flex-alc wrapper">
            <BiSearch
              size="20"
              className="BiSearch"
            />
            <input
              type="text"
              placeholder="搜索"
              className="input"
            />
          </InputWrapper>
        </Input>
      </LeftContainerTop>
      <LeftContainerBottom
        ref={bottomRef}
        isInput={isInput}
      >
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
  z-index: 2;
`

interface LeftContainerTopStyleProps {
  isInput: boolean
}
const LeftContainerTop = styled.div<LeftContainerTopStyleProps>`
  position: relative;
  gap: 6px;

  & .logo {
    margin: 0 10px;
    & img {
      width: 50px;
      height: 50px;
      opacity: ${props => (props.isInput ? 0 : 1)};
      z-index: ${props => (props.isInput ? -1 : 1)};
      transition: opacity 0.1s linear;
    }
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

  & .BiArrowBack,
  & .BiSearch {
    color: ${props => props.theme.colors.nav_icon};
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

  &:focus-within {
    .wrapper {
      transform: translateX(-26px);
    }
  }
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

    &::placeholder {
      color: ${props => props.theme.colors.nav_icon};
    }
  }
`
