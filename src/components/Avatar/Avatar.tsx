import React from "react"
import styled from "styled-components"
import avatar from "../../assets/avatar.png"
import { useNavigate, useLocation } from "react-router-dom"
import getUnionUrl from "../../utils/getUnionUrl"

interface AvatarProps {
  src: string | undefined
  size: string
  id?: string
}
const Avatar: React.FC<AvatarProps> = props => {
  const { src, size, id } = props
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleRoute = () => {
    if (!id) return
    const toPath = `profile/${id}`
    const nowPath = pathname.replace("/", "")

    if (toPath !== nowPath) navigate(toPath)
  }

  return (
    <Container className="flex flex-alc flex-jcc">
      <Wrapper
        className="flex flex-alc flex-jcc"
        size={size}
        onClick={handleRoute}
        id={id}
      >
        <img src={getUnionUrl(src) || avatar} alt="" />
      </Wrapper>
    </Container>
  )
}

export default Avatar

const Container = styled.div`
  position: relative;
  user-select: none;
`
interface WrapperPorps {
  size: string
  id?: string
}
const Wrapper = styled.div<WrapperPorps>`
  border-radius: 50%;
  overflow: hidden;
  cursor: ${p => (p.id ? "pointer" : "auto")};
  border: 1px solid #ccc;

  & img {
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    object-fit: cover;
  }
`
