import React from "react"
import { CSSTransition } from "react-transition-group"
import styled from "styled-components"
import "./style.css"

export const defaultInterval = 250
export const defaultDuration = 5000

type SnackbarProps = { children: React.ReactNode }
type CreateContextType = {
  openSnackbar: (text: string, duration: number) => void
  closeSnackbar: () => void
}

export const SnackbarContext = React.createContext<CreateContextType>({
  openSnackbar: () => {},
  closeSnackbar: () => {}
})

const Snackbar = ({ children }: SnackbarProps) => {
  const [open, setOpen] = React.useState<boolean>(false)
  const [text, setText] = React.useState<string>("")
  const [timeoutId, setTimeoutId] = React.useState<number>(0)
  const [duration, setDuration] = React.useState<number>(defaultDuration)
  const nodeRef = React.useRef(null)

  const triggerSnackbar = (text: string, duration: number) => {
    setText(text)
    setOpen(true)
    setDuration(duration)
  }

  const closeSnackbar = () => {
    setOpen(false)
  }

  const openSnackbar = (text: string, duration: number) => {
    if (open === true) {
      setOpen(false)
      setTimeout(() => {
        triggerSnackbar(text, duration)
      }, defaultInterval)
    } else {
      triggerSnackbar(text, duration)
    }
  }
  return (
    <SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
      {children}
      <CSSTransition
        nodeRef={nodeRef}
        in={open}
        timeout={150}
        mountOnEnter
        unmountOnExit
        onEnter={() => {
          clearTimeout(timeoutId)
          setTimeoutId(setTimeout(() => setOpen(false), duration))
        }}
        className="snackbar-wrapper snackbar-wrapper-bottom-left"
        classNames={{
          enter: "snackbar-enter snackbar-enter-bottom-left",
          enterActive: "snackbar-enter-active snackbar-enter-active-bottom-left",
          exitActive: "snackbar-exit-active snackbar-exit-active-bottom-left"
        }}
      >
        <div ref={nodeRef}>
          <SnackbarContainer className="snackbar">
            <div className="snackbar__text">{text}</div>

            <button className="snackbar__close" onClick={closeSnackbar}>
              <CloseIcon />
            </button>
          </SnackbarContainer>
        </div>
      </CSSTransition>
    </SnackbarContext.Provider>
  )
}

export default Snackbar
const CloseIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 12 12">
    <path
      fill="currentColor"
      d="M11.73 1.58L7.31 6l4.42 4.42-1.06 1.06-4.42-4.42-4.42 4.42-1.06-1.06L5.19 6 .77 1.58 1.83.52l4.42 4.42L10.67.52z"
      fillRule="evenodd"
    />
  </svg>
)
const SnackbarContainer = styled.div`
  background-color: ${props => props.theme.colors.snackbar_bg};
  
  & .snackbar__text,
  & .snackbar__close {
    
    color: ${props => props.theme.colors.snackbar_color};
  }
`
