import {toast,TypeOptions} from "react-toastify";

const toastNotify=(message:string,type:TypeOptions)=>{
    toast(message, {
        type:type,
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
    });
}
export default toastNotify;