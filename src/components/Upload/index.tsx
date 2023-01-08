import React from "react"
import styled from "styled-components"

interface Props {
  id: string
  accept: "image/*" | "video/*" | "audio/*" | ".mp4"
  handleChange: React.ChangeEventHandler<HTMLInputElement>
  children: React.ReactElement
}

const Upload: React.FC<Props> = props => {
  const { id, accept, handleChange, children } = props

  return (
    <>
      <Label htmlFor={id}>
        <InputUpload
          id={id}
          type="file"
          accept={accept}
          onChange={handleChange}
          multiple
        />
        {children}
      </Label>
    </>
  )
}

export default Upload

const InputUpload = styled.input`
  /* opacity: 0; */
  display: none;
`
const Label = styled.label`
  width: inherit;
  height: inherit;
`
