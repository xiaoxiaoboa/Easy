import { DefaultTheme, createGlobalStyle } from "styled-components"

export const lightTheme: DefaultTheme = {
  colors: {
    color_scheme: "light",
    primary: "#2374e1",
    nav_bg: "#ffff",
    nav_icon: "rgb(137 133 133)",
    nav_shadow: "0px 2px 6px 0px #cacaca",
    nav_left_shadow: "-4px 3px 6px 6px #c0c0c080",
    nav_left_close: "#d6d6d65c",
    nav_inputbg: "#f0f2f5",
    nav_middlehover: "#cccccc40"
  }
}

export const darkTheme: DefaultTheme = {
  colors: {
    color_scheme: "dark",
    primary: "#2374e1",
    nav_bg: "",
    nav_icon: "",
    nav_shadow: "",
    nav_left_shadow: '',
    nav_left_close: "",
    nav_inputbg: "",
    nav_middlehover: ""
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
  
`
