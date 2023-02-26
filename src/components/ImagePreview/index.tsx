import React from "react"
import { PhotoProvider, PhotoView } from "react-photo-view"
import styled from "styled-components"
import "react-photo-view/dist/react-photo-view.css"
import { nanoid } from "nanoid"
import { MdClear } from "react-icons/md"

interface Props {
  files: File[]
  handleDeleteItem: (target: File) => void
}

const ImagePreview = (props: Props) => {
  const { files, handleDeleteItem } = props

  return (
    <PhotoProvider>
      <FilesPreview className="flex-c">
        {files.map(file =>
          file.type.includes("image") ? (
            <FileWrapper key={nanoid()} className="flex-c flex-alc">
              <PhotoView src={URL.createObjectURL(file)}>
                <img src={URL.createObjectURL(file)} title="点击预览" />
              </PhotoView>
              <span>{file.name}</span>
              <span
                className="flex flex-alc deleteimg click"
                onClick={() => handleDeleteItem(file)}
              >
                <MdClear size={22} />
              </span>
            </FileWrapper>
          ) : (
            <FileWrapper key={nanoid()} className="flex-c flex-alc">
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
                        <video
                          controls
                          src={URL.createObjectURL(file)}
                          style={{ width: "100%" }}
                        ></video>
                      </div>
                    </div>
                  )
                }}
              >
                <video src={URL.createObjectURL(file)}></video>
              </PhotoView>
              <span>{file.name}</span>
              <span
                className="flex flex-alc deleteimg click"
                onClick={() => handleDeleteItem(file)}
              >
                <MdClear size={22} />
              </span>
            </FileWrapper>
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
  position: relative;
  gap: 4px;
  & img,
  & video {
    width: 300px;
    max-height: 200px;
    object-fit: cover;
    cursor: pointer;
    user-select: none;
  }

  &:hover .deleteimg {
    display: flex;
  }

  & .deleteimg {
    display: none;
    padding: 8px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    right: 18px;
    cursor: pointer;
  }
`
