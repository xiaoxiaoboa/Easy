import "styled-components"

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      color_scheme: string

      primary: string
      nav_bg: string
      nav_icon: string
      nav_shadow: string
      nav_left_shadow: string
      nav_left_close: string
      nav_inputbg: string
      nav_middlehover: string
    }
  }
}
