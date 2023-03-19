import React from "react"
import styled from "styled-components"

interface childrenProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
interface DialogPorps {
  children: (props: childrenProps) => React.ReactNode
  sourceElement: HTMLDivElement | null
}

const Dialog: React.FC<DialogPorps> = props => {
  const { children, sourceElement } = props
  const [open, setOpen] = React.useState<boolean>(false)
  const containerRef = React.useRef<HTMLDivElement | null>(null)

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
      !sourceElement?.contains(e.target as Node)
    ) {
      setOpen(false)
      document.onclick = null
    }
  }

  return (
    <Container className="flex" ref={containerRef}>
      {children({ open, setOpen })}
    </Container>
  )
}

export default Dialog

const Container = styled.div``
