import React from 'react'
import nfimage from '../assets/image404.png'

function NotFound() {
  return (
    <>
    <div className='w-full h-[70vh] flex flex-col items-center justify-center'>
      <h1 className='text-white text-6xl text-center'>404 <br /> Page Not Found</h1>
      <img className='w-80 h-80 mt-9' src={nfimage} />
    </div>
    </>
    
  )
}

export default NotFound
