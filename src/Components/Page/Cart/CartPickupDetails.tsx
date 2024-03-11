import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useInitiatePaymentMutation } from "../../../Apis/paymentApi";
import { hashText, inputHelper } from "../../../Helpers";
import { apiResponse, cartItemModel, userModel } from "../../../Interfaces";
import { RootState } from "../../../Storage/Redux/store";
import { MiniLoader } from "../Common";
import {useNavigate} from "react-router";

function CartPickupDetails() {
  const [loading,setLoading]=useState(false);
  const [initiatePayment]=useInitiatePaymentMutation();
  const navigate=useNavigate();
  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.CartItems ?? []
  );

  const userData:userModel=useSelector((state:RootState)=>state.userAuthStore);

  let grandTotal = 0;
  let totalItems = 0;

  const initialUserData={
    name:userData.fullName,
    email:userData.email,
    phoneNumber:""
  };

  shoppingCartFromStore.map((cartItem: cartItemModel) => {
    totalItems += cartItem.Quantity ?? 0;
    grandTotal += (cartItem.MenuItem?.Price ?? 0) * (cartItem.Quantity ?? 0);
    return null;
  });

  const [userInput,setUserInput]=useState(initialUserData);
  const handleUserInput=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const tempData=inputHelper(e,userInput);
    setUserInput(tempData);
  }

  //to autofill the pickup details even after refresh
  useEffect(()=>{
    setUserInput({
      name:userData.fullName,
      email:userData.email,
      phoneNumber:""

    });
  },[userData])
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { data }: apiResponse = await initiatePayment(userData.id);
    // const orderSummary={grandTotal,totalItems};
    // console.log(data);
    navigate("/payment", {
      state: { apiResult: data?.Result, userInput },
    });
  };
  return (
    <div
      className="card text-bg-light mb-3 cartPickupDetails"
      style={{ minWidth: "70%", borderRadius: 0 }}
    >
      <div className="card-header p-3" style={{fontWeight:"bold"}}>Pickup Details</div>
      <div className="card-body">
        {/* <h5 className="card-title">Light card title</h5> */}
        <form onSubmit={handleSubmit}
          className="col-10 mx-auto"
          style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
        >
          <div className="form-group mt-2">
          <span style={{fontSize:"0.8rem"}}>Pickup Name</span>
            <input
              type="text"
              value={userInput.name}
              className="form-control"
              placeholder="Enter your full name"
              name="name"
              onChange={handleUserInput}
              required
            />
          </div>
          <div className="form-group mt-3">
          <span style={{fontSize:"0.8rem"}}>Pickup Email</span>
            <input
              type="email"
              value={userInput.email}
              className="form-control"
              placeholder="you@example.com"
              name="email"
              onChange={handleUserInput}
              required
            />
          </div>

          <div className="form-group mt-3">
            <span style={{fontSize:"0.8rem"}}>Pickup Phone Number</span>
            <input
              type="number"
              value={userInput.phoneNumber}
              className="form-control"
              placeholder="Enter valid 10 digit number"
              name="phoneNumber"
              onChange={handleUserInput}
              required
            />
          </div>
          
          <div className="form-group mt-4">
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Have a coupon code?"
                aria-label="Recipient's username"
                aria-describedby="apply"
                style={{width:"80%"}}
              />
              <button
                className="btn btn-primary form-control text-light "
                type="button"
                id="apply"
              style={{width:"20%"}}>
                Apply
              </button>
            </div>
          </div>
          <div className="form-group mt-4">
           
            <div className="d-flex justify-content-between">
              <h5 style={{ fontSize: "0.8rem" }}>
                <span style={{ fontWeight: "bold" }}>Grand Total :</span>{" "}
                {grandTotal.toFixed(2)}
              </h5>
              <h5 style={{ fontSize: "0.8rem" }}>
                <span style={{ fontWeight: "bold" }}>No of items :</span>{" "}
                {totalItems}
              </h5>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-lg btn-success form-control mt-4 text-light" disabled={loading}
          >
            {loading?<MiniLoader/>:"Looks Good? Place Order!"}
            
          </button>
        </form>
      </div>
    </div>
    // <div className="border pb-5 pt-3" style={{width:"70%"}}>
    //   <h4 className="text-primary ps-5 " style={{fontFamily:"sans-serif"}}>Pickup Details</h4>
    //   <hr />
    //   <form className="col-10 mx-auto" style={{fontFamily:"serif"}}>
    //     <div className="form-group mt-2" >
    //       Pickup Name
    //       <input
    //         type="text"
    //         className="form-control"
    //         placeholder="name..."
    //         name="name"
    //         required
    //       />
    //     </div>
    //     <div className="form-group mt-3">
    //       Pickup Email
    //       <input
    //         type="email"
    //         className="form-control"
    //         placeholder="email..."
    //         name="email"
    //         required
    //       />
    //     </div>

    //     <div className="form-group mt-3">
    //       Pickup Phone Number
    //       <input
    //         type="number"
    //         className="form-control"
    //         placeholder="phone number..."
    //         name="phoneNumber"
    //         required
    //       />
    //     </div>
    //     <div className="form-group mt-3">
    //       <div className="card p-3" style={{ background: "ghostwhite" }}>
    //         <h5>Grand Total : $10</h5>
    //         <h5>No of items : 5</h5>
    //       </div>
    //     </div>
    //     <button
    //       type="submit"
    //       className="btn btn-lg btn-success form-control mt-3"
    //     >
    //       Looks Good? Place Order!
    //     </button>
    //   </form>
    // </div>
  );
}

export default CartPickupDetails;
