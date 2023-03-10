import React from "react"
import styled from "styled-components"
import avatar from "../../assets/avatar.png"
import { useNavigate, useLocation } from "react-router-dom"
import getUnionUrl from "../../utils/getUnionUrl"

interface AvatarProps {
  src: string | undefined
  size: string
  id?: string
  isShowOnline?: boolean
  isOnline?: boolean
}
const Avatar: React.FC<AvatarProps> = props => {
  const { src, size, id, isOnline, isShowOnline = false } = props
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
      <Wrapper className="flex flex-alc flex-jcc" size={size} onClick={handleRoute}>
        <img src={getUnionUrl(src) || avatar} alt="" />
      </Wrapper>
      {isShowOnline ? <Mark isOnline={isOnline}></Mark> : <></>}
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
}
const Wrapper = styled.div<WrapperPorps>`
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #ccc;

  & img {
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    object-fit: cover;
  }
`

interface MarkProps {
  isOnline: boolean | undefined
}
const Mark = styled.div<MarkProps>`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: ${props => (props.isOnline ? "#82e0aa" : "#909497")};
  border-radius: 50%;
  bottom: 0;
  right: 0;
`
