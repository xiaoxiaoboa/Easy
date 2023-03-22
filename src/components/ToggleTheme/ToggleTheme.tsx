import React from "react"
import styled from "styled-components"
import sun from "../../assets/sun.png"
import moon from "../../assets/moon.png"
import { useLocalStorageState } from "ahooks"
import { MyContext } from "../../context/context"
import { ActionTypes } from "../../types/reducer/index"

const ToggleTheme = () => {
  const { dispatch } = React.useContext(MyContext)
  const [theme, setTheme] = useLocalStorageState<"light" | "dark">("color_mode", {
    defaultValue: "light"
  })
  const wrapperRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    dispatch({ type: ActionTypes.THEME, payload: theme })
  }, [theme])

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Container className="flex" onClick={handleToggle}>
      <Wrapper
        className={`flex flex-alc ${theme === "light" ? "switch-close" : "switch-open"}`}
        ref={wrapperRef}
      >
        <span></span>
      </Wrapper>
    </Container>
  )
}

export default ToggleTheme

const Container = styled.div`
  width: 55px;
  cursor: pointer;

  & .switch-close {
    & span {
      transform: translateX(0);
    }
  }
  & .switch-open {
    border-color: transparent;
    background-color: ${p => p.theme.colors.primary};
    & span {
      transform: translateX(30px);
    }
  }
`
const Wrapper = styled.div`
  width: 100%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 14px;
  padding: 2px;
  background-color: ${p => p.theme.colors.inputbtn_bg};

  & span {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: white;
    transition: transform 0.2s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  }
`
