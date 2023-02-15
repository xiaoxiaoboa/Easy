import "styled-components"

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      color_scheme: string

      primary: string
      secondary:string

      hovercolor: string

      nav_bg: string
      nav_icon: string
      nav_border_bottom:string
      nav_left_shadow: string
      nav_left_close: string
      nav_inputbg: string
      nav_btn_bgcolor: string

      bgcolor: string

      inputbtn_color: string
      inputbtn_bg: string
      inputbtn_hoverbg: string

      fd_boxshadow: string
      fd_divisioncolor:string

      profile_cardbg:string

      theme_btn_bg:string

      publish_layer_color:string
    }
    icon: {
      icons: string
    }
  }
}
