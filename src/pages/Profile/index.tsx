import React from "react"
import styled from "styled-components"
import Avatar from "../../components/Avatar/Avatar"
import { ImCamera } from "react-icons/im"
import { GiConfirmed } from "react-icons/gi"
import { VscError } from "react-icons/vsc"
import Upload from "../../components/Upload"
import { NavLink, Outlet } from "react-router-dom"
import getUnionUrl from "../../utils/getUnionUrl"
import { MyContext } from "../../context/context"
import bg from "../../assets/bg2.png"

const Profile = () => {
  return (
    <Container>
      <Wrapper className="flex-c">
        <Head />
        <Outlet />
      </Wrapper>
    </Container>
  )
}

export default Profile

const Container = styled.div`
  width: 100%;
  height: calc(100% - 60px);
`
const Wrapper = styled.div``

const Head = () => {
  const { state } = React.useContext(MyContext)
  const [uploadedCover, setUploadedCover] = React.useState<File | null>(null)

  /* 更改封面 */
  const handleUploadChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    if (e.target.files) {
      const coverFile = e.target.files[0]
      if (coverFile) setUploadedCover(coverFile)
    }
  }

  /* 取消更改 */
  const handleCancel = () => {
    setUploadedCover(null)
  }

  return (
    <HeadContainer className="flex-c flex-jcsb flex-alc">
      <div className="blurbglayer"></div>
      <div className="blurbg">
        <img src={getUnionUrl(state.user_info?.result.profile_blurImg)} alt="" />
      </div>
      <Background className="flex flex-alc">
        <div className="bgwrapper">
          <img
            src={
              uploadedCover
                ? URL.createObjectURL(uploadedCover)
                : getUnionUrl(state.user_info?.result.profile_img)
            }
            alt=""
          />
        </div>
        <UserInfo className="flex-c flex-jce">
          <div className="flex flex-ale">
            <AvatarWrapper>
              <Avatar src={getUnionUrl(state.user_info?.result.avatar)} size="160" />
            </AvatarWrapper>
            <span>{state.user_info?.result.nick_name}</span>
          </div>
        </UserInfo>
        <CoverButtons className="flex flex-alc ">
          {uploadedCover ? (
            <>
              <div className="flex flex-alc confirmupload click">
                <GiConfirmed />
                保存
              </div>
              <div className="flex flex-alc cancelupload click" onClick={handleCancel}>
                <VscError />
                放弃
              </div>
            </>
          ) : (
            <></>
          )}
          <Upload id="image" accept="image/*" handleChange={handleUploadChange}>
            <div className="flex flex-alc changecover click">
              <ImCamera />
              更换封面
            </div>
          </Upload>
        </CoverButtons>
      </Background>
      <ProfileNav>
        <ProfileNavWrapper className="flex flex-jcc">
          <NavList className="flex flex-alc ">
            <NavLink to={"moments"} className="momentwrapper">
              <li className="mymoment">我的瞬间</li>
              <div className="underline"></div>
            </NavLink>
            <NavLink to={"photos"} className="photowrapper">
              <li className="myphoto">照片</li>
              <div className="underline"></div>
            </NavLink>
            <NavLink to={"videos"} className="videowrapper">
              <li className="mymoment">视频</li>
              <div className="underline"></div>
            </NavLink>
          </NavList>
        </ProfileNavWrapper>
      </ProfileNav>
    </HeadContainer>
  )
}

const HeadContainer = styled.div`
  background-color: ${props => props.theme.colors.profile_cardbg};
  gap: 110px;
  position: relative;

  & .blurbglayer {
    width: 100%;
    height: 400px;
    position: absolute;
    top: 0;
    z-index: 2;
    background-image: linear-gradient(
      to top,
      #ffffff,
      rgba(255, 255, 255.9),
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0)
    );
  }
  & .blurbg {
    width: 100%;
    height: 400px;
    position: absolute;
    top: 0;
    z-index: 1;

    & img {
      width: inherit;
      height: inherit;
    }
  }
`

const Background = styled.div`
  position: relative;
  width: 1100px;
  height: 400px;
  z-index: 3;

  @media (max-width: 770px) {
    height: 300px;
  }
  @media (max-width: 1100px) {
    width: 100%;
  }
  @media (min-width: 1900px) {
    height: 500px;
    width: 1400px;
  }

  & .bgwrapper {
    width: 100%;
    height: 100%;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    overflow: hidden;
    user-select: none;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`
const CoverButtons = styled.div`
  position: absolute;
  right: 60px;
  bottom: 20px;
  gap: 12px;

  & .changecover,
  & .confirmupload,
  & .cancelupload {
    border-radius: 6px;
    background-color: white;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
    padding: 8px 10px;
    user-select: none;
    gap: 4px;
    color: black;
  }
  & .confirmupload {
    background-color: #66cdaa;
  }
  & .cancelupload {
    color: white;
    background-color: #cb4335;
  }
`
const UserInfo = styled.div`
  position: absolute;
  width: 100%;
  bottom: -108px;
  padding: 0 24px;
  gap: 10px;

  & span {
    margin-bottom: 14px;
    font-size: 30px;
    font-weight: bold;
  }

  &::after {
    content: "";
    width: 100%;
    height: 1px;
    background-color: ${props => props.theme.colors.fd_divisioncolor};
    margin: 10px 0;
  }
`
const AvatarWrapper = styled.div`
  border-radius: 50%;
  padding: 4px;
  background-color: ${props => props.theme.colors.profile_cardbg};
`

const ProfileNav = styled.div`
  width: 100%;
`
const ProfileNavWrapper = styled.div``
const NavList = styled.ul`
  list-style: none;
  font-weight: bold;
  gap: 10px;
  color: ${props => props.theme.colors.secondary};

  & .momentwrapper,
  & .photowrapper,
  & .videowrapper {
    padding-bottom: 10px;
    position: relative;
    overflow: hidden;

    & .underline {
      position: absolute;
      height: 3px;
      width: 100%;
      background-color: ${props => props.theme.colors.primary};
      bottom: -3px;
      transition: transform 0.2s linear;
    }
  }
  & li {
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;
    &:hover {
      background-color: ${props => props.theme.colors.hovercolor};
    }
  }
`
