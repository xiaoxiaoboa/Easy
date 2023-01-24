import React from "react"
import styled from "styled-components"
import bg from "../../assets/bg.jpg"
import bg2 from "../../assets/temp.jpg"

const imgAmount = 8

const Photos = () => {
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
    const lastLineSurPlusImgAmount = Math.floor(imgAmount % perLineAmount)

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
    <Container className="flex flex-jcc">
      <Wrapper className="flex-c">
        <h3>你的照片</h3>
        <Contents ref={contentsRef} className="flex flex-alc">
          <div ref={imgWrapperRef} className="flex">
            <img src={bg} alt="" />
          </div>
          <div className="flex">
            <img src={bg2} alt="" />
          </div>
          <div className="flex">
            <img src={bg} alt="" />
          </div>
          <div className="flex">
            <img src={bg} alt="" />
          </div>
          <div className="flex">
            <img src={bg} alt="" />
          </div>
          <div className="flex">
            <img src={bg} alt="" />
          </div>
          <div className="flex">
            <img src={bg2} alt="" />
          </div>
          <div className="flex">
            <img src={bg} alt="" />
          </div>
        </Contents>
      </Wrapper>
    </Container>
  )
}

export default Photos

const Container = styled.div`
  /* padding: 10px 270px; */
  padding: 10px 0;
`
const Wrapper = styled.div`
  width: calc(1100px - 48px);
  padding: 10px;
  background-color: ${props => props.theme.colors.profile_cardbg};

  @media (max-width: 1100px) {
    width: calc(100% - 48px);
  }
  @media (min-width: 1900px) {
    width: calc(1400px - 48px);
  }
`
const Contents = styled.div`
  /* display: grid;
  grid-template-columns: repeat(5, 1fr); */
  flex-wrap: wrap;

  gap: 10px;

  & div {
    flex: 1;
    min-width: 180px;
    height: 190px;
    border-radius: 8px;
    overflow: hidden;
  }

  & img {
    width: 100%;
    object-fit: cover;
  }
`
