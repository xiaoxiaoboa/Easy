import React from "react"
import { PhotoProvider, PhotoView } from "react-photo-view"
import styled from "styled-components"
import "react-photo-view/dist/react-photo-view.css"
import { nanoid } from "nanoid"

interface Props {
  images: File[]
}

const ImagePreview: React.FC<Props> = props => {
  const { images } = props

  return (
    <PhotoProvider>
      <FilesPreview className="flex-c">
        {images.map(image =>
          image.type.includes("image") ? (
            <PhotoView key={nanoid()} src={URL.createObjectURL(image)}>
              <FileWrapper className="flex-c flex-alc">
                <img src={URL.createObjectURL(image)} title="点击预览" />
                <span>{image.name}</span>
              </FileWrapper>
            </PhotoView>
          ) : (
            <PhotoView
              key={nanoid()}
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
                        src={URL.createObjectURL(image)}
                        style={{ width: "100%" }}
                      ></video>
                    </div>
                  </div>
                )
              }}
            >
              <FileWrapper className="flex-c flex-alc">
                <video src={URL.createObjectURL(image)}></video>
                <span>{image.name}</span>
              </FileWrapper>
            </PhotoView>
          )
        )}
      </FilesPreview>
    </PhotoProvider>
  )
}

export default React.memo(ImagePreview)

const FilesPreview = styled.div`
  gap: 10px;
`

const FileWrapper = styled.div`
  & img,
  & video {
    width: 300px;
    max-height: 200px;
    object-fit: cover;
    cursor: pointer;
  }
`
