import Swal from "sweetalert2";

const sweetAlertMsg=(title1:string)=>Swal.fire({
    // title: "Are you sure you want to Logout?",
    title:title1,
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirm"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Logged Out ",
        text: "You have been logged out successfully.",
        icon: "success"
      });
    }
});

const successOrderAlert=(title2:string,text:string)=>Swal.fire({
  title: title2,
  text: text,
  icon: "success"
});
export default {sweetAlertMsg,successOrderAlert};