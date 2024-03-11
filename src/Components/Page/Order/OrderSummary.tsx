import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUpdateOrderHeaderMutation } from "../../../Apis/orderApi";
import { getStatusColor } from "../../../Helpers";
import { cartItemModel } from "../../../Interfaces";
import { RootState } from "../../../Storage/Redux/store";
import { SD_Roles, SD_Status } from "../../../Utility/SD";
import { MainLoader } from "../Common";
import { OrderSummaryProps } from "./OrderSummaryProps";

function OrderSummary({ data, userInput }: OrderSummaryProps) {

  const badgeTypeColor=getStatusColor(data.Status!);          // ! checks if status is empty
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.userAuthStore);
  const [loading, setIsLoading] = useState(false);
  const [updateOrderHeader] = useUpdateOrderHeaderMutation();

  const nextStatus: any =
    data.Status! === SD_Status.CONFIRMED
      ? { color: "info", value: SD_Status.BEING_COOKED }
      : data.Status! === SD_Status.BEING_COOKED
      ? { color: "warning", value: SD_Status.READY_FOR_PICKUP }
      : data.Status! === SD_Status.READY_FOR_PICKUP && {
          color: "success",
          value: SD_Status.COMPLETED,
        };
  
  const handleNextStatus = async () => {
          setIsLoading(true);
          await updateOrderHeader({
            OrderHeaderId: data.Id,
            Status: nextStatus.value,
          });
      
          setIsLoading(false);
        };
      
  const handleCancel = async () => {
          setIsLoading(true);
          await updateOrderHeader({
            OrderHeaderId: data.Id,
            Status: SD_Status.CANCELLED,
          });
          setIsLoading(false);
        };

  

  return (
    <div>
     
      {loading && <MainLoader />}
      {!loading && (
        <>
          <div className="d-flex justify-content-between align-items-center" style={{maxWidth:"90%"}}>
            <h3 className="text-success mb-4">Order Summary</h3>
            <span className={`btn btn-outline-${badgeTypeColor} fs-6 text-end`}>
              {data.Status}
            </span>
          </div>
      <div
        className="card text-bg-light mb-3 cartPickupDetails"
        style={{ maxWidth: "90%", borderRadius: 0 }}
      >
        <div className="card-header p-3" style={{ fontWeight: "bold" }}>
          Order Summary
        </div>
        <div className="card-body">
          {/* <h5 className="card-title">Light card title</h5> */}
          <form
            className="col-10 mx-auto"
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            <div className="form-group mt-2">
              <span style={{ fontSize: "0.8rem" }}>Name : </span>
              <input
                type="text"
                value={userInput.name}
                className="form-control"
                placeholder="Enter your full name"
                name="name"
                //   onChange={handleUserInput}
                required
              />
            </div>
            <div className="form-group mt-3">
              <span style={{ fontSize: "0.8rem" }}>Email : </span>
              <input
                type="email"
                value={userInput.email}
                className="form-control"
                placeholder="you@example.com"
                name="email"
                //   onChange={handleUserInput}
                required
              />
            </div>

            <div className="form-group mt-3">
              <span style={{ fontSize: "0.8rem" }}>Phone Number : </span>
              <input
                type="number"
                value={userInput.phoneNumber}
                className="form-control"
                placeholder="Enter valid 10 digit number"
                name="phoneNumber"
                //   onChange={handleUserInput}
                required
              />
            </div>
            <div className="border py-3 px-2 mt-2">
              <h5 className="text-secondary">Menu Items</h5>
              <div className="p-3">
                {data.CartItems?.map((cartItem: cartItemModel, index: number) => {
                  return (
                    <div className="d-flex" key={index}style={{ fontSize: "0.8rem" }}>
                      <div className="d-flex w-100 justify-content-between">
                        <p>{cartItem.MenuItem?.Name}</p>
                        <p>
                          <i className="bi bi-currency-rupee"></i> 
                          {cartItem.MenuItem?.Price} X {cartItem.Quantity} =
                        </p>
                      </div>
                      <p style={{ width: "70px", textAlign: "right" }}>
                        <i className="bi bi-currency-rupee"></i> 
                        {(cartItem.MenuItem?.Price??0)*(cartItem.Quantity??0)}
                      </p>
                    </div>
                  );
                })}

                <hr />
                <h5 className="text-danger" style={{ textAlign: "right",fontSize: "0.9rem" }}>
                  <i className="bi bi-currency-rupee"></i> 
                  {data.CartTotal}
                </h5>
              </div>
            </div>

          </form>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center text-center mt-3" style={{maxWidth:"90%"}}>
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              Back to Orders
            </button>
            {userData.role == SD_Roles.ADMIN && (
              <div className="d-flex">
                {data.Status! !== SD_Status.CANCELLED &&
                  data.Status! !== SD_Status.COMPLETED && (
                    <button
                      className="btn btn-danger mx-2"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  )}
                <button
                  className={`btn btn-${nextStatus.color}`}
                  onClick={handleNextStatus}
                >
                  {nextStatus.value}
                </button>
              </div>
            )}
      </div>
      </>
      )}
  </div>
  );
}

export default OrderSummary;
