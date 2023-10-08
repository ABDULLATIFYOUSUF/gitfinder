import React from 'react'
import nfimage from '../assets/image404.png'

function NotFound() {
  return (
    <>
    <div className='w-full h-[80vh] flex flex-row items-center justify-center'>
        <img className='w-96 h-96' src={nfimage} />
      <h1 className='text-white text-9xl text-center'>Data Not Found</h1>
    </div>
    </>
    
  )
}

export default NotFound
