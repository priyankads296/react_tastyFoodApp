import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAllOrdersQuery } from "../../../Apis/orderApi";
import { MainLoader } from "../Common";
import { orderHeader } from "../../../Interfaces";
import { RootState } from "../../../Storage/Redux/store";
import OrderListProps from "./OrderListType";
import { getStatusColor } from "../../../Helpers";
import { SD_Status } from "../../../Utility/SD";

function OrderList({ orderData, isLoading }: OrderListProps) {
  const userId = useSelector((state: RootState) => state.userAuthStore.id);
  // const { orderData, isLoading } = useGetAllOrdersQuery(userId);
  const navigate = useNavigate();
  // let completedImage = require("../../Assets/Images/chefImg.jpg");
  let completedImage=require("../../../Assets/Images/completed.jpg")
  return (
    <>
   
      <div>
        {isLoading && <MainLoader />}
        {!isLoading && (
          <div className="container orders">
            {/* <h2 className="mt-5 mb-4" style={{fontFamily:"Georgia",color:"darkkhaki",fontWeight:"bold"}}>Orders List</h2> */}
        
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {orderData.map((orderItem: orderHeader) => {
                 const badgeColor=getStatusColor(orderItem.Status!);
                //  console.log(orderItem.OrderDetails[0]?.MenuItem);
                 console.log(orderItem.Status);
                return(
                <div key={orderItem.OrderHeaderId} className="col">
                  <div className={orderItem.Status!=SD_Status.COMPLETED?"card ":"card completed"} >
                    <div className="card-body w-100">
                      <div className="row col-12">
                        <div className="col-md-6">
                          <h5 className="card-title text-success">
                            Order ID: {orderItem.OrderHeaderId}
                          </h5>
                          <p className="card-text" style={{fontFamily:"sans-serif",color:"gray"}}>
                            {orderItem.PickupName}
                            <br />
                            {orderItem.PickupPhoneNumber}
                          </p>
                        </div>
                        <div className="col-md-6 ">
                          <img
                            src={orderItem.Status!=SD_Status.COMPLETED? orderItem.OrderDetails[0].MenuItem?.Image:completedImage}
                            className="w-100"
                            style={{
                              
                              borderRadius: "50%",
                              boxShadow: "0 2px 5px 1px",
                              marginLeft: "20px",
                            }}
                          ></img>
                          {/* <img src={orderItem.OrderDetails![2].MenuItem?.Image} className="w-50 " style={{borderRadius:"50%",boxShadow:"0 2px 5px 1px"}}></img> */}
                          {/* {orderItem.OrderDetails?.map(
                          (item: orderDetail, index: number) => (
                            <img key={index} src={item.MenuItem.Image}></img>
                          )
                        )} */}
                        </div>
                      </div>

                      <p className="card-text">
                        <strong>Amount : </strong>
                        <span>{orderItem.OrderTotal!.toFixed(2)}</span>
                        <br />
                        <strong>Total Items : </strong>
                        <span>{orderItem.TotalItems}</span>
                      </p>
                      
                      <div className="row">
                        <div className="col-md-8">
                          <p className="card-text">
                          <strong>Ordered On : </strong>
                          <span>
                            {new Date(orderItem.OrderDate!).toLocaleDateString()}
                          </span>
                          </p>
                        </div>
                        <div className="col-md-4">
                        <span
                          className={`card-text badge bg-${badgeColor}-subtle text-muted`}
                          style={{
                            borderRadius: 0,
                            padding: "none",
                            display: "flex",
                            justifyContent:"center",
                            fontSize:"0.8rem",
                            width:"100px"
                          }}
                        >{orderItem.Status}</span>

                        </div>
                      </div>
                     
                      {/* <ul className="list-unstyled">
                      {orderItem.OrderDetails?.map(
                        (item: orderDetail, index: number) => (
                          <li key={index}>{item.ItemName}</li>
                        )
                      )}
                    </ul> */}
                      {/* <p className="card-text">Total: ${orderItem.TotalItems}</p> */}
                    </div>

                    <button
                      className="btn btn-secondary w-100 card-footer"
                      onClick={() =>
                        navigate(
                          "/order/orderDetails/" + orderItem.OrderHeaderId
                        )
                      }
                    >
                      More Details
                    </button>
                  </div>
                </div>
                )
})}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default OrderList;
