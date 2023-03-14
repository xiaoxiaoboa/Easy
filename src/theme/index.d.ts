import "styled-components"

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      color_scheme: string

      primary: string
      secondary: string

      hovercolor: string
      clicked_hovercolor:string

      nav_bg: string
      nav_icon: string
      nav_border_bottom: string
      nav_left_shadow: string
      nav_left_close: string
      nav_inputbg: string
      nav_btn_bgcolor: string

      bgcolor: string

      inputbtn_color: string
      inputbtn_bg: string
      inputbtn_hoverbg: string

      fd_boxshadow: string
      fd_divisioncolor: string
      fd_toprightboxshadow:string

      profile_cardbg: string

      theme_btn_bg: string

      publish_layer_color: string

      profileImg_loading_color: string
      profileBlurImg_gradient_color:string

      snackbar_bg: string
      snackbar_color:string

      message_bgcolor:string
      message_count_bgcolor:string
    }
    icon: {
      icons: string
    }
  }
}
