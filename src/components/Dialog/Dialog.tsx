import React from "react"
import styled from "styled-components"

interface DialogPorps {
  isOpen: boolean
  children: React.ReactNode
  handleClose: () => void
}

const Dialog: React.FC<DialogPorps> = props => {
  const { children, handleClose, isOpen } = props

  const handler: React.MouseEventHandler<HTMLDivElement> = e => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }
  return (
    <Container style={{ position: isOpen ? "fixed" : "static" }} onClick={handler}>
      {children}
    </Container>
  )
}

export default Dialog

const Container = styled.div`
  /* position: fixed; */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: auto;
  z-index: 1;
`
