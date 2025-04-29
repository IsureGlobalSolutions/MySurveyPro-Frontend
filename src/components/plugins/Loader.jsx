import React from 'react'
import { ClipLoader } from "react-spinners"

const Loader = () => {
  return (
    <>
    <ClipLoader
      color="#36d7b7"  // You can change this color
      size={50}
      speedMultiplier={1}
    />
    </>
  )
}

export default Loader