import React from "react"
import styled from "styled-components"
import Avatar from "../../components/Avatar/Avatar"
import FeedCard from "../../components/FeedCard"
import ImagePreview from "../../components/ImagePreview"
import MyInput from "../../components/MyInput/MyInput"
import Upload from "../../components/Upload"
import { MdClear } from "react-icons/md"
import getUnionUrl from "../../utils/getUnionUrl"
import { MyContext } from "../../context/context"
import { UserType } from "../../types"

interface HomeMiddleProps {
  user_info: UserType | undefined
}
const HomeMiddle: React.FC<HomeMiddleProps> = porps => {
  const { user_info } = porps
  return (
    <Container className="flex">
      <Wrapper className="flex-c flex-alc">
        {user_info && <Publish user_info={user_info} />}

        <FeedCard />
      </Wrapper>
    </Container>
  )
}

export default HomeMiddle

const Container = styled.div`
  width: 100%;
`
const Wrapper = styled.div`
  width: 100%;
  height: max-content;
  padding: 20px 0 30px 0;
  gap: 20px;
`

/* 顶部发布卡片 */
interface PublishProps {
  user_info: UserType | undefined
}
const Publish: React.FC<PublishProps> = props => {
  const { user_info } = props
  const [open, setOpen] = React.useState<boolean>(false)
  const handleOpen = () => {
    setOpen(true)
    document.documentElement.classList.add("forbid-scroll")
  }

  return (
    <PublishContainer className="flex-c test">
      {open ? <PublishLayer user_info={user_info} handleClose={setOpen} /> : <></>}

      <div className="top flex-r flex-jcsb">
        <div className="avatar">
          <Avatar id={user_info?.user_id} src={user_info?.avatar} size="40" />
        </div>
        <div className="inputbtn flex-r flex-alc" onClick={handleOpen}>
          Xiaoxin Yuan，分享你的瞬间把！
        </div>
      </div>
      <div className="division"></div>
      <div className="option flex-r flex-alc flex-jcc">
        <div className="photo flex-r flex-alc flex-jcc">
          <div className="photoicon"></div>
          照片
        </div>
        <div className="video flex-r flex-alc flex-jcc">
          <div className="videoicon"></div>
          视频
        </div>
        <div className="somebody flex-r flex-alc flex-jcc">
          <div className="somebodyicon"></div>
          @某人
        </div>
      </div>
    </PublishContainer>
  )
}
/* styled */
const PublishContainer = styled.div`
  width: 600px;
  border-radius: 8px;
  background-color: ${props => props.theme.colors.nav_bg};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  padding: 10px 20px;

  & .top {
    gap: 10px;
  }

  & .inputbtn {
    width: 510px;
    background-color: ${props => props.theme.colors.inputbtn_bg};
    border-radius: 24px;
    padding: 0 12px;
    cursor: pointer;
    color: ${props => props.theme.colors.inputbtn_color};

    &:hover {
      background-color: ${props => props.theme.colors.inputbtn_hoverbg};
    }
  }

  & .division {
    width: 100%;
    height: 1px;
    background-color: ${props => props.theme.colors.fd_divisioncolor};
    margin: 10px 0;
  }

  & .option {
    & .photo,
    & .video,
    & .somebody {
      width: 33%;
      gap: 8px;
      text-align: center;
      padding: 6px 8px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
      color: ${props => props.theme.colors.secondary};

      &:hover {
        background-color: ${props => props.theme.colors.hovercolor};
      }
    }

    & .photoicon,
    & .videoicon,
    & .somebodyicon {
      width: 30px;
      height: 30px;
      background-repeat: no-repeat;
      background-size: 32px 222px;
      background-image: url(${props => props.theme.icon.icons});
    }
    & .photoicon {
      background-position: center 3px;
    }
    & .videoicon {
      background-position: center -160px;
    }
    & .somebodyicon {
      background-position: center -190px;
    }
  }
`

interface PublishLayerProps {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>
  user_info: UserType | undefined
}
interface childInputProps {
  clickToFocus: () => void
  inputValue: () => string
}
const PublishLayer: React.FC<PublishLayerProps> = props => {
  const { handleClose, user_info } = props
  const [files, setFiles] = React.useState<File[]>([])

  /* 子组件MyInput的ref */
  const childInputRef = React.useRef<childInputProps>(null)

  /* 控制子组件input，在点击空白时聚焦到input */
  const handleClick: React.MouseEventHandler<HTMLDivElement> = e => {
    childInputRef.current?.clickToFocus()
  }

  /* 上传图片或视频 */
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const newFiles = e.target.files
    if (newFiles) setFiles(prev => [...prev, ...newFiles])
    e.target.value = ""
  }

  /* 发布 */
  const handleCommit = () => {
    if (files.length < 1 && childInputRef.current?.inputValue().trim() === "") return
    console.log(files)
    console.log(childInputRef.current?.inputValue())
  }

  /* 删除files列表中的某一项 */
  const handleDeleteItem = React.useCallback(
    (target: File) => {
      const newFiles = files.filter(file => file !== target)
      setFiles(newFiles)
    },
    [files]
  )

  const handleCloseSelf = () => {
    handleClose(false)
    document.documentElement.classList.remove("forbid-scroll")
  }

  return (
    <PublishLayerContainer className="flex-r flex-alc flex-jcc">
      <PublishLayerWrapper className="flex-c">
        <ClosePublishLayer className="flex flex-alc click" onClick={handleCloseSelf}>
          <MdClear size={22} />
        </ClosePublishLayer>
        <div className="flex-r flex-jcc">
          <h3>创建瞬间</h3>
        </div>
        <PublishLayerMain className="flex-c">
          <UserInfo className="flex-r flex-alc">
            <Avatar src={user_info?.avatar} size="36" />
            Xiaoxin Yuan
          </UserInfo>
          <EditableArea onClick={handleClick}>
            <MyInput ref={childInputRef} placeholder="Xiaoxin Yuan，分享你的瞬间把！" />
          </EditableArea>
        </PublishLayerMain>
        <Files className="flex">
          <Upload id="image" accept="image/*" handleChange={handleChange}>
            <div className="addPic click" title="上传图片"></div>
          </Upload>
          <Upload id="video" accept="video/*" handleChange={handleChange}>
            <div className="addVid click"></div>
          </Upload>
        </Files>
        <PublishButton>
          <button className="click" onClick={handleCommit}>
            发布
          </button>
        </PublishButton>
      </PublishLayerWrapper>

      {files.length ? (
        <FilesPreview>
          <ImagePreview files={files} handleDeleteItem={handleDeleteItem} />
        </FilesPreview>
      ) : (
        <></>
      )}
    </PublishLayerContainer>
  )
}

const PublishLayerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${props => props.theme.colors.publish_layer_color};

  z-index: 4;
`
const PublishLayerWrapper = styled.div`
  position: relative;
  /* background-color: white; */
  background-color: ${props => props.theme.colors.nav_bg};
  width: 500px;
  padding: 20px;
  overflow: hidden;
  gap: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.18);
`
const ClosePublishLayer = styled.div`
  position: absolute;
  top: 12px;
  right: 26px;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${props => props.theme.colors.nav_btn_bgcolor};
`
const PublishLayerMain = styled.div`
  flex: 1;
  gap: 6px;
`
const UserInfo = styled.div`
  gap: 10px;
`
const EditableArea = styled.div`
  min-height: 220px;
  cursor: text;
`
const Files = styled.div`
  gap: 10px;

  & .addPic,
  & .addVid {
    background-image: url(${props => props.theme.icon.icons});
    width: 34px;
    height: 34px;
    background-repeat: no-repeat;
    background-size: 30px 220px;
    cursor: pointer;
  }

  & .addPic {
    background-position: center 5px;
  }

  & .addVid {
    background-position: center -157px;
  }
`

const PublishButton = styled.div`
  & button {
    cursor: pointer;
    padding: 5px;
    width: 100%;
    background-color: ${props => props.theme.colors.primary};
    border: 0;
    color: white;
    border-radius: 6px;
    font-weight: bold;
    font-size: 17px;
  }
`
const FilesPreview = styled.div`
  position: absolute;
  top: 15%;
  right: 8%;
  padding: 10px;
  max-height: 80vh;
  overflow-y: auto;
  background-color: white;

  &::-webkit-scrollbar {
    display: none;
  }
`
