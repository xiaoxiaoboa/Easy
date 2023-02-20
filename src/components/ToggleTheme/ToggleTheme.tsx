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

  React.useEffect(() => {
    dispatch({ type: ActionTypes.THEME, payload: theme })
  }, [theme])

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Container className="flex flex-alc flex-jcc" onClick={handleToggle}>
      <Wrapper className="flex flex-alc flex-jcc">
        {theme === "dark" ? <img src={sun} /> : <img src={moon} />}
      </Wrapper>
    </Container>
  )
}

export default ToggleTheme

const Container = styled.div`
  position: fixed;
  bottom: 30px;
  right: 50px;
  background-color: ${props => props.theme.colors.theme_btn_bg};
  padding: 6px;
  border-radius: 50%;
  opacity: 0.8;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;

  &:hover {
    opacity: 1;
  }
`
const Wrapper = styled.div`
  width: 40px;
  height: 40px;

  & img {
    width: 100%;
    height: 100%;
  }
`
