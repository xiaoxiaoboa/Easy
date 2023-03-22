import React from "react"
import styled from "styled-components"

interface childrenProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
interface DialogPorps {
  children: (props: childrenProps) => React.ReactNode
}

const Popover: React.FC<DialogPorps> = props => {
  const { children } = props
  const [open, setOpen] = React.useState<boolean>(false)
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const sourceElement = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (open) {
      if (document.onclick) {
        document.onclick(undefined as any)
      }
      document.onclick = hanleClick
    }
  }, [open])

  const hanleClick = (e?: MouseEvent) => {
    if (!e) {
      setOpen(false)
    } else if (
      !containerRef.current?.contains(e.target as Node) &&
      !sourceElement.current?.contains(e.target as Node)
    ) {
      setOpen(false)
      document.onclick = null
    }
  }

  return (
    <Container className="flex" ref={containerRef}>
      <div ref={sourceElement}>{children({ open, setOpen })}</div>
    </Container>
  )
}

export default Popover

const Container = styled.div``
