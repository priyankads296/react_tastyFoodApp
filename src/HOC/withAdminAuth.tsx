//this will take a component and check whether user role is Admin to access this compoennt
import jwt_decode from "jwt-decode";
import { sweetAlertMsgs } from "../Helpers";
import { SD_Roles } from "../Utility/SD";

const withAdminAuth=(WrappedComponent:any)=>{
    return(props:any)=>{
        const accessToken=localStorage.getItem("token")??"";

        if(accessToken){
            const decode:{
                role:string;
            }=jwt_decode(accessToken);
            if(decode.role!==SD_Roles.ADMIN)
            {
                window.location.replace("/accessDenied");
                return null;
            }
        }
        else{
            window.location.replace("/");
            sweetAlertMsgs.sweetAlertMsg("Login to continue");
        }
        
        return <WrappedComponent {...props}/>           //if access token is present it returns back the component
    }
}

export default withAdminAuth;