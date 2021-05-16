import React, { useState } from 'react'

const OrderImage = ({isOpen,close,domNode,image}) => {

    if(!isOpen){
        return null
    }
    return <>
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-gray-400 opacity-70 z-10 " ></div>
        <div id="order_image" ref={domNode} className="w-5/6 md:w-2/5 fixed  md:left-1/3 top-5 rounded-2xl
          bg-white flex flex-col items-center justify-between px-2 z-20 py-2 at-image" >
            <img src={image} className="w-full h-full" />
        </div>
    </>
}

export default OrderImage
