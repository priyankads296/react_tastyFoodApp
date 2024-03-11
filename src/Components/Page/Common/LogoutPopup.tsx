import React from 'react'
import "./popup.css"
interface PopupProps{
    message:string,
    onClose:()=>void;
}

const LogoutPopup:React.FC<PopupProps>=({message,onClose})=> {
  return (
    <div>
      <div className="popup">
        <div className="popup-content">
            <p>{message}</p>
            <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default LogoutPopup;
