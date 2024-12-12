import React from 'react'


const Modal = ({ open, children })=>{
  return <>{open && <div role="dialog"  className="flex bg-gray-600 bg-opacity-50 justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none transition duration-450 ease-in-out"  id="modal">{children}</div>}</>;
}

export default Modal;



