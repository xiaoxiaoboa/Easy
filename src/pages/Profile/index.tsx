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
import Loading from "../../components/Loading/Loading"
import compress from "../../api/compress.api.js"
import useRequested from "../../hooks/useRequested"
import { alterationCover, queryUser } from "../../api/user.api.js"
import { DataType } from "../../types/index.js"
import getBase64 from "../../utils/getBase64"
import { ActionTypes } from "../../types/reducer"
import { useParams } from "react-router-dom"
import { AlterationCoverType, UserType } from "../../types/user.type"

const Profile = () => {
  const params = useParams()
  const { state } = React.useContext(MyContext)
  const [user, setUser] = React.useState<UserType>()

  React.useEffect(() => {
    if (state.user_info?.result.user_id === params.user_id) {
      setUser(state.user_info?.result)
    } else {
      queryUser({ user_id: params.user_id }).then(val => {
        if (val.code === 1) {
          setUser(val.data)
        }
      })
    }
  }, [params.user_id,state.user_info?.result])

  return (
    <Container>
      <Wrapper className="flex-c">
        <Head user={user!} />
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

interface HeadProps {
  user?: UserType
}
const Head: React.FC<HeadProps> = props => {
  const { user } = props
  const { state, dispatch } = React.useContext(MyContext)
  const { loading, setLoading, requestedOpt } = useRequested()
  const [uploadedCover, setUploadedCover] = React.useState<File | null>(null)
  const [compressedCover, setCompressedCover] = React.useState<string | null>(null)

  /* ???????????? */
  const handleUploadChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    if (e.target.files) {
      const coverFile = e.target.files[0]
      if (coverFile) {
        setLoading(true)
        compress(state.user_info?.result.user_id!, coverFile).then(val => {
          setUploadedCover(coverFile)
          setCompressedCover(val.data.compressed)
          setLoading(false)
        })
      }
    }
  }

  /* ???????????? */
  const handleSaveChange = async () => {
    /* ??????base64??? */
    const res = await getBase64(uploadedCover!)
    /* ??????????????????????????????id?????????base64 */
    const params: AlterationCoverType = {
      user_id: state.user_info?.result.user_id!,
      base64: {
        background: res.base64 as string,
        background_blur: compressedCover!
      }
    }
    /* ??????loading */
    setLoading(true)

    /* ?????????????????? */
    const alterationRes = await alterationCover(params)
    if (alterationRes.code === 0) return requestedOpt(alterationRes)

    /* ????????????state??????????????? */
    const user_info: DataType = {
      result: alterationRes.data,
      token: state.user_info?.token!
    }
    dispatch({
      type: ActionTypes.USER_INFO,
      payload: user_info
    })

    /* localStorage?????? */
    localStorage.setItem("user_info", JSON.stringify(user_info))
    setLoading(false)
    requestedOpt(alterationRes)

    /* ????????????????????? */
    setCompressedCover(null)
    setUploadedCover(null)
  }

  /* ???????????? */
  const handleCancel = () => {
    setCompressedCover(null)
    setUploadedCover(null)
  }

  return (
    <HeadContainer className="flex-c flex-jcsb flex-alc">
      <div className="blurbglayer"></div>
      <div className="blurbg">
        <img src={compressedCover || getUnionUrl(user?.profile_blurImg)} alt="" />
      </div>
      <Background className="flex flex-alc">
        {loading && (
          <div className="loadingwrapper">
            <Loading />
          </div>
        )}

        <div className="bgwrapper">
          <img
            src={
              uploadedCover
                ? URL.createObjectURL(uploadedCover)
                : getUnionUrl(user?.profile_img)
            }
            alt=""
          />
        </div>
        <UserInfo className="flex-c flex-jce">
          <div className="flex flex-ale">
            <AvatarWrapper>
              <Avatar src={user?.avatar} size="160" />
            </AvatarWrapper>
            <span>{user?.nick_name}</span>
          </div>
        </UserInfo>
        <CoverButtons className="flex flex-alc ">
          {uploadedCover ? (
            <>
              <div
                className="flex flex-alc confirmupload click"
                onClick={handleSaveChange}
              >
                <GiConfirmed />
                ??????
              </div>
              <div className="flex flex-alc cancelupload click" onClick={handleCancel}>
                <VscError />
                ??????
              </div>
            </>
          ) : (
            <></>
          )}
          {user?.user_id === state.user_info?.result.user_id && (
            <Upload id="image" accept="image/*" handleChange={handleUploadChange}>
              <div className="flex flex-alc changecover click">
                <ImCamera />
                ????????????
              </div>
            </Upload>
          )}
        </CoverButtons>
      </Background>
      <ProfileNav>
        <ProfileNavWrapper className="flex flex-jcc">
          <NavList className="flex flex-alc ">
            <NavLink to={"moments"} className="momentwrapper">
              <li className="mymoment">
                {user?.user_id === state.user_info?.result.user_id ? "???" : "ta"}?????????
              </li>
              <div className="underline"></div>
            </NavLink>
            <NavLink to={"photos"} className="photowrapper">
              <li className="myphoto">??????</li>
              <div className="underline"></div>
            </NavLink>
            <NavLink to={"videos"} className="videowrapper">
              <li className="mymoment">??????</li>
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
    background-image: ${props => props.theme.colors.profileBlurImg_gradient_color};
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

  & .loadingwrapper {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.colors.profileImg_loading_color};
    /* background-color: #3f3f3fd4; */
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
