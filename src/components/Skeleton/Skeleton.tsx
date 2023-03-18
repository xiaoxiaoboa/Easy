import React from "react"
import ContentLoader from "react-content-loader"
import styled from "styled-components"

interface SkeletonProps {
  theme: "dark" | "light"
  setElement?: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>
}

const backgroundColor_dark = "#818181"
const backgroundColor_light = "#f3f3f3"
const foregroundColor_dark = "#666666"
const foregroundColor_light = "#ecebeb"

export const SkeletonFeed = (props: SkeletonProps) => {
  const { theme, setElement } = props
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (containerRef.current && setElement) {
      setElement(containerRef.current)
    }
  }, [])

  return (
    <Container ref={containerRef}>
      <ContentLoader
        speed={2}
        width={540}
        height={220}
        viewBox="0 0 540 220"
        backgroundColor={theme === "dark" ? backgroundColor_dark : backgroundColor_light}
        foregroundColor={theme === "dark" ? foregroundColor_dark : foregroundColor_light}
      >
        <circle cx="20" cy="20" r="20" />
        <rect x="46" y="8" rx="4" ry="4" width="131" height="8" />
        <rect x="47" y="27" rx="4" ry="4" width="80" height="8" />
        <rect x="21" y="200" rx="6" ry="6" width="131" height="10" />
        <rect x="225" y="200" rx="6" ry="6" width="131" height="10" />
        <rect x="411" y="200" rx="6" ry="6" width="131" height="10" />
      </ContentLoader>
    </Container>
  )
}
const Container = styled.div`
  background-color: ${props => props.theme.colors.nav_bg};
  padding: 20px;
  width: 600px;
  border-radius: 8px;
  box-shadow: ${props => props.theme.colors.fd_boxshadow};
`
