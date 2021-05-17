import React from 'react'

const Confirm = ({header,message,handler,close,node}) => {
    return <>
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-gray-400 opacity-70 z-10  " ></div>
        <div id="edit-profile"  className="w-5/6  lg:w-2/5 fixed lg:left-1/3 top-8 rounded-2xl pb-5
          bg-white flex flex-col items-center justify-between py-2 z-20" >
              <span className="text-lg font-semibold ">{header}</span>
              <div className="w-full p-10 ">{message}</div>
              <div>
                  <button  className="px-6 py-1 border  rounded-lg mr-8
                    text-white bg-gray-600 text-lg  hover:bg-gray-500 focus:outline-none "
                     onClick={handler}>Confirm</button>
                  <button className="px-6 py-1 border rounded-lg text-lg  
                  hover:bg-gray-100 focus:outline-none"  onClick={close}>Cancel</button>
              </div>
          </div>
    </>
}

export default Confirm
