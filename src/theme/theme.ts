import { DefaultTheme, createGlobalStyle } from "styled-components"
import icons from "../assets/icons.png"

export const lightTheme: DefaultTheme = {
  colors: {
    color_scheme: "light",

    primary: "#2374e1",
    secondary: "#65676b",

    hovercolor: "#cccccc40",

    nav_bg: "#ffffff",
    nav_icon: "rgb(137 133 133)",
    nav_border_bottom: "#ccc",
    nav_left_shadow: "-4px 3px 6px 6px #c0c0c080",
    nav_left_close: "#d6d6d65c",
    nav_inputbg: "#f0f2f5",
    nav_btn_bgcolor: "#e4e5ea",

    bgcolor: "#f0f2f5",

    inputbtn_bg: "#f0f2f5",
    inputbtn_color: "#0202027a",
    inputbtn_hoverbg: "#ededed",

    fd_boxshadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
    fd_divisioncolor: "#e3e3e3",

    profile_cardbg: "#FFFFFF",

    theme_btn_bg: "white",

    publish_layer_color: "rgba(244, 244, 244, 0.8)",

    profileImg_loading_color: "#828282d4",
    profileBlurImg_gradient_color: `linear-gradient(
      to top,
      #ffffff,
      rgba(255, 255, 255.9),
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0)
    )`,
    snackbar_bg: "#333",
    snackbar_color: "white"
  },
  icon: {
    icons: `${icons}`
  }
}

export const darkTheme: DefaultTheme = {
  colors: {
    color_scheme: "dark",

    primary: "#2374e1",
    secondary: "#B0B3B8",

    hovercolor: "#303031",

    nav_bg: "#242526",
    nav_icon: "#B0B3B8",
    nav_border_bottom: "#444",
    nav_left_shadow: "",
    nav_left_close: "",
    nav_inputbg: "#3A3B3C",
    nav_btn_bgcolor: "rgba(255,255,255,.1)",

    bgcolor: "#18191a",

    inputbtn_bg: "#3A3B3C",
    inputbtn_color: "#B0B3B8",
    inputbtn_hoverbg: "#4d4e4f",

    fd_boxshadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
    fd_divisioncolor: "#4d4d4d",

    profile_cardbg: "#242526",

    theme_btn_bg: "#242526",

    publish_layer_color: "rgba(11, 11, 11, 0.8)",

    profileImg_loading_color: "#3f3f3fd4",
    profileBlurImg_gradient_color: `linear-gradient(
      to top,
      #242526,
      rgba(36, 37, 38, 0.9),
      rgba(36, 37, 38, 0.7),
      rgba(36, 37, 38, 0.4),
      rgba(36, 37, 38, 0)
    )`,
    snackbar_bg: "white",
    snackbar_color: "black"
  },
  icon: {
    icons: `${icons}`
  }
}

export const GlobalStyle = createGlobalStyle`
  html {
    overflow-y:scroll;
    height:100%;
    color-scheme: ${props => props.theme.colors.color_scheme};
  }
  
  body {
    height:100%;
    background-color: ${props => props.theme.colors.bgcolor};
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

    & .home:hover, 
    & .friends:hover,
    & .mymoment:hover,
    & .myphoto:hover,
    & .myvideo:hover{
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
