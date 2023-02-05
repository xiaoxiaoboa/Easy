import React from "react"
import styled from "styled-components"
import { PhotoProvider, PhotoView } from "react-photo-view"
import { nanoid } from "nanoid"

const Photos = () => {
  return (
    <PhotosAndVideos
      type="photo"
      data={[
        "https://scontent-hkt1-2.xx.fbcdn.net/v/t39.30808-6/322331050_6370853882927898_3277033179577228949_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=19026a&_nc_ohc=VI-mN7BpYkcAX_nRbLu&tn=0O5GBqUNjW9LQkLS&_nc_ht=scontent-hkt1-2.xx&oh=00_AfDtSrr6RzsTL7nMZw323O-MKTBzWqD_xkMGirMzrgVYuw&oe=63DBC766"
      ]}
    />
  )
}

export default Photos

interface PhotosAndVideosProps {
  type: "photo" | "video"
  data: string[]
}
export const PhotosAndVideos: React.FC<PhotosAndVideosProps> = props => {
  const { type, data } = props
  const contentsRef = React.useRef<HTMLDivElement>(null)
  const imgWrapperRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    generateElement()

    let timer = -1
    window.onresize = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        generateElement()
      }, 300)
    }
  }, [])

  /* 一行照片不够数量时，补齐空白的数量 */
  const getElementAmount = (): number => {
    /* 照片大容器的宽度 */
    const contentClientWidth = contentsRef.current?.clientWidth!
    /* 每个照片容器的宽度 */
    const imgClientWidth = imgWrapperRef.current?.clientWidth!
    /* 每行可以放进几张照片 */
    const perLineAmount = Math.floor(contentClientWidth / imgClientWidth)
    /* 最后一行多出来几张照片 */
    const lastLineSurPlusImgAmount = Math.floor(data.length % perLineAmount)

    if (lastLineSurPlusImgAmount > 0) {
      /* 每行的数量 - 多出来的数量 = 需要补的空白的数量 */
      const demandAmount = perLineAmount - lastLineSurPlusImgAmount
      return demandAmount
    } else {
      return 0
    }
  }
  /* 生成空白 */
  const generateElement = () => {
    /* 获取需要生成空白的数量 */
    const amount = getElementAmount()
    /* HTML */
    const element = `<div class='flex generated'></div>`

    /* 获取已经生成的元素 */
    const hadElement = contentsRef.current?.querySelectorAll("div.generated")
    /* 如果需要生成的元素数量大于已生成的数量，就接着生成 */
    if (hadElement && amount > hadElement?.length!) {
      for (let i = 0; i < amount - hadElement.length; i++) {
        contentsRef.current?.insertAdjacentHTML("beforeend", element)
      }
    } else if (hadElement && amount < hadElement?.length) {
      /* 如果小于已生成的数量，就删除相应的数量 */
      for (let i = 0; i < hadElement.length - amount; i++) {
        contentsRef.current?.removeChild(hadElement[i])
      }
    } else if (!hadElement) {
      /* 如果没有已经生成的空白，就按需要生成 */
      for (let i = 0; i < amount; i++) {
        contentsRef.current?.insertAdjacentHTML("beforeend", element)
      }
    }
  }
  return (
    <PhotoProvider>
      <Container className="flex flex-jcc">
        <Wrapper className="flex-c">
          <h3>{type === "photo" ? "你的照片" : "你的视频"}</h3>
          <Contents ref={contentsRef} className="flex flex-alc">
            {data.map(str => (
              <div ref={imgWrapperRef} className="flex" key={nanoid()}>
                {type === "photo" ? (
                  <PhotoView src={str}>
                    <img src={str} alt="" />
                  </PhotoView>
                ) : (
                  <PhotoView
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
                            <video controls src={str} style={{ width: "100%" }}></video>
                          </div>
                        </div>
                      )
                    }}
                  >
                    <video  src={str} />
                  </PhotoView>
                )}
              </div>
            ))}
          </Contents>
        </Wrapper>
      </Container>
    </PhotoProvider>
  )
}

const Container = styled.div`
  /* padding: 10px 270px; */
  padding: 14px 0;
  margin-bottom: 30px;
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
  flex-wrap: wrap;

  gap: 10px;

  & div {
    flex: 1;
    min-width: 180px;
    max-width: 220px;
    height: 190px;
    border-radius: 8px;
    overflow: hidden;
  }

  & img {
    width: 100%;
    object-fit: cover;
    cursor: pointer;
  }
`
