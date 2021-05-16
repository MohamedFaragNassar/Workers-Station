import React from 'react'

const Confirm = ({isOpen,close,title,message,handler}) => {
    if(!isOpen){
        return null
    }
    return <>
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-gray-400 opacity-70 z-10  " ></div>
        <div id="edit-profile"  className="w-2/5 fixed left-1/3 top-20 rounded-2xl pb-5
          bg-white flex flex-col items-center justify-between py-2 z-20" >
            <div className="w-full mx-auto flex  items-center justify-between   mb-2 " >
                <div className="flex  items-center justify-between ml-2">
                    <button className="mx-2 text-lg" onClick={close}><i class="fal fa-times-circle"></i></button>
                    <h1 className="font-semibold text-xl">{title}</h1>
                </div>
            </div>
            <div className="flex flex-col items-center justify-between mt-5 w-full" >
                <div className="w-full p-2 font-bold mb-4">{message}</div>
                <button onClick={handler} className="px-4 py-2 mt-2 bg-gray-600 text-white rounded-md" >
                    Confirm
                </button>
            </div>
        </div>
    </>
}

export default Confirm
