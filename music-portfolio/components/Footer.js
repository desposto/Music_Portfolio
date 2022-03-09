import React from 'react'
import {FaCopyright} from "react-icons/fa"

const Footer = () => {
  return (
    <div className=' items-center h-8 bg-bk text-white relative shadow-sm font-mono w-full flex text-base pl-4'>
        <FaCopyright></FaCopyright>David Esposto - 2022
    </div>
  )
}

export {Footer}