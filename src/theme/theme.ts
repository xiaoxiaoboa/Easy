import { DefaultTheme, createGlobalStyle } from "styled-components"
import icons from "../assets/icons.png"

export const lightTheme: DefaultTheme = {
  colors: {
    color_scheme: "light",

    primary: "#2374e1",

    hovercolor: "#cccccc40",

    nav_bg: "#ffffff",
    nav_icon: "rgb(137 133 133)",
    nav_shadow: "0px 2px 6px 0px #cacaca94",
    nav_left_shadow: "-4px 3px 6px 6px #c0c0c080",
    nav_left_close: "#d6d6d65c",
    nav_inputbg: "#f0f2f5",
    nav_btn_bgcolor: "#e4e5ea",

    bgcolor: "#f0f2f5",

    inputbtn_bg: "#f0f2f5",
    inputbtn_color: "#0202027a",
    inputbtn_hoverbg: "#ededed",

    fd_boxshadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
    fd_toplightcolor: "#706b6b",
    fd_cardfuncolor: "#65676b",
    fd_divisioncolor: "#e3e3e3"
  },
  icon: {
    icons: `${icons}`
  }
}

export const darkTheme: DefaultTheme = {
  colors: {
    color_scheme: "dark",

    primary: "#2374e1",

    hovercolor: "",

    nav_bg: "",
    nav_icon: "",
    nav_shadow: "",
    nav_left_shadow: "",
    nav_left_close: "",
    nav_inputbg: "",
    nav_btn_bgcolor: "#e4e5ea",

    bgcolor: "",

    inputbtn_bg: "",
    inputbtn_color: "",
    inputbtn_hoverbg: "",

    fd_boxshadow: "",
    fd_toplightcolor: "",
    fd_cardfuncolor: "",
    fd_divisioncolor: ""
  },
  icon: {
    icons: ""
  }
}

export const GlobalStyle = createGlobalStyle`
  html {
    color-scheme: ${props => props.theme.colors.color_scheme};
  }

  a:link{
    text-decoration: none;
  }
  a {
    color:inherit;
  }

  .active{
    & .underline {
      transform: translateY(-3px);
    }

    & .home:hover, & .friends:hover {
        background-color: unset !important;
    }
  }

  .click {
    &:active {
        transform: scale(0.95);
        transform-origin: center center;
    }
  }
  
`
