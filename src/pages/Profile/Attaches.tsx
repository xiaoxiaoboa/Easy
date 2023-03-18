import React from "react"
import styled from "styled-components"
import { PhotoProvider, PhotoView } from "react-photo-view"
import { nanoid } from "nanoid"
import { MyContext } from "../../context/context"
import { allAttaches } from "../../api/feeds.api"
import { Feed_attachType } from "../../types/feed.type"
import getUnionUrl from "../../utils/getUnionUrl"
import { useLocation } from "react-router-dom"

export const Photos = () => {
  const { state } = React.useContext(MyContext)
  const contentsRef = React.useRef<HTMLDivElement>(null)
  const imgWrapperRef = React.useRef<HTMLDivElement>(null)
  const [current, setCurrent] = React.useState<string | null>(null)
  const location = useLocation()
  const [images, setImages] = React.useState<Feed_attachType[]>([])
  const [videos, setVideos] = React.useState<Feed_attachType[]>([])

  React.useEffect(() => {
    setCurrent(location.pathname.split("/")[3])
  }, [location])

  React.useEffect(() => {
    allAttaches(state.user_info?.result.user_id!).then(val => {
      if (val.code === 1) {
        setImages(val.data.filter(i => i.attach_type === "image"))
        setVideos(val.data.filter(i => i.attach_type === "video"))
      }
    })
  }, [])

  return (
    <PhotoProvider>
      <Container className="flex flex-jcc">
        <Wrapper className="flex-c">
          <h3>{current === "photos" ? "你的照片" : "你的视频"}</h3>
          <Contents ref={contentsRef}>
            {current === "photos" &&
              images.map(item => (
                <div ref={imgWrapperRef} className="flex" key={item.attach_id}>
                  <PhotoView src={getUnionUrl(item.attach_link)}>
                    <img src={getUnionUrl(item.attach_link)} />
                  </PhotoView>
                </div>
              ))}
            {current === "videos" &&
              videos.map(item => (
                <PhotoView
                  key={item.attach_id}
                  width={1000}
                  height={500}
                  render={({ scale, attrs }) => {
                    const width = attrs.style?.width as number
                    const offset = (width - 1000) / 1000
                    const childScale = scale === 1 ? scale + offset : 1 + offset
                    return (
                      <div {...attrs}>
                        <div
                          style={{
                            transform: `scale(${childScale})`,
                            width: 1000,
                            transformOrigin: "0 0"
                          }}
                        >
                          <video
                            controls
                            src={getUnionUrl(item.attach_link)}
                            style={{ width: "100%" }}
                          ></video>
                        </div>
                      </div>
                    )
                  }}
                >
                  <div ref={imgWrapperRef} className="flex" key={item.attach_id}>
                    <video src={getUnionUrl(item.attach_link)} />
                  </div>
                </PhotoView>
              ))}
            <div className="empty"></div>
            <div className="empty"></div>
            <div className="empty"></div>
            <div className="empty"></div>
          </Contents>
        </Wrapper>
      </Container>
    </PhotoProvider>
  )
}
export default Photos
const Container = styled.div`
  /* padding: 10px 270px; */
  padding: 14px 0;
  flex: 1;
`
const Wrapper = styled.div`
  width: calc(1100px - 48px);
  padding: 10px 20px 14px 20px;
  gap: 10px;
  background-color: ${props => props.theme.colors.profile_cardbg};

  @media (max-width: 1100px) {
    width: calc(100% - 48px);
  }
  @media (min-width: 1900px) {
    width: calc(1400px - 48px);
  }
`
const Contents = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

  gap: 10px;

  & div {
    height: 300px;
    border-radius: 8px;
    overflow: hidden;
  }

  & img,
  & video {
    width: 100%;
    object-fit: cover;
    cursor: pointer;
  }

  & .empty {
    height: 0;
  }
`
