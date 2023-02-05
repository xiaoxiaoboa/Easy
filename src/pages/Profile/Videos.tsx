import React from "react"
import { PhotosAndVideos } from "./Photos"
import vae from "../../assets/Vae.mp4"

const Videos = () => {
  return <PhotosAndVideos type="video" data={[vae]} />
}

export default Videos
