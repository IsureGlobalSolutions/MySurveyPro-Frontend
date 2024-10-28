import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

const Loader = () => {
  return (
    <>
    <RotatingLines
  visible={true}
  height="46"
  width="46"
  color="grey"
  strokeWidth="5"
  strokeColor='orange'
  animationDuration="0.75"
  ariaLabel="rotating-lines-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </>
  )
}

export default Loader