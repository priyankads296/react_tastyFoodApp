
//this will take a component and check whether user is authorised to access this compoennt
const withAuth=(WrappedComponent:any)=>{
    
    return(props:any)=>{
        const accessToken=localStorage.getItem("token");
        if(!accessToken)
        {
             window.location.replace("/");
            alert("Login to continue");
            // navigate("/");
            return null;
        }
        return <WrappedComponent {...props}/>           //if access token is present it returns back the component
    }
}

export default withAuth;