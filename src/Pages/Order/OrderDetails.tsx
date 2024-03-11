import React from 'react'
import { useParams } from 'react-router-dom';
import { useGetOrderDetailsQuery } from '../../Apis/orderApi';
import { OrderSummary } from '../../Components/Page/Order';

function OrderDetails() {
    const { id } = useParams();
    const { data, isLoading } = useGetOrderDetailsQuery(id);
    let userInput, orderDetails;                //since we need it to call OrderSummaryElement
    // console.log(data);
    if (!isLoading && data?.Result) {
        // console.log(data.Result);
        userInput = {
            name: data.Result[0].PickupName,
            email: data.Result[0].PickupEmail,
            phoneNumber: data.Result[0].PickupPhoneNumber,
          };
        orderDetails = {
            Id: data.Result[0].OrderHeaderId,
            CartItems: data.Result[0].OrderDetails,
            CartTotal: data.Result[0].OrderTotal,
            Status: data.Result[0].Status,
          };
    }

  return (
    <div
      className="container my-5 mx-auto p-5 w-100"
      style={{ maxWidth: "750px" }}
    >
      {!isLoading && orderDetails && userInput && (
        <OrderSummary data={orderDetails} userInput={userInput} />
      )}
    </div>
  )
}

export default OrderDetails
