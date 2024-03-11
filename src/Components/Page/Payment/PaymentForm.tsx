import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../../Apis/orderApi";
import { sweetAlertMsgs, toastNotify } from "../../../Helpers";
import { apiResponse, cartItemModel } from "../../../Interfaces";
import { SD_Status } from "../../../Utility/SD";
import { OrderSummaryProps } from "../Order";

const PaymentForm = ({ data, userInput }: OrderSummaryProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [createOrder] = useCreateOrderMutation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setIsProcessing(true);
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete", //return the url what we go after payment
      },
      redirect: "if_required",
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      toastNotify("An unexpected error occured.", "error");
      setIsProcessing(false);
      // console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      // console.log(result);

      let grandTotal = 0;
      let totalItems = 0;

      const orderDetailsDTO: any = [];
      data.CartItems?.forEach((item: cartItemModel) => {
        const tempOrderDetail: any = {};
        tempOrderDetail["MenuItemId"] = item.MenuItem?.Id;
        tempOrderDetail["Quantity"] = item.Quantity;
        tempOrderDetail["ItemName"] = item.MenuItem?.Name;
        tempOrderDetail["Price"] = item.MenuItem?.Price;
        orderDetailsDTO.push(tempOrderDetail);
        grandTotal += item.Quantity! * item.MenuItem?.Price!;
        totalItems += item.Quantity!;
      });

      const response: apiResponse = await createOrder({
        PickupName: userInput.name,
        PickupPhoneNumber: userInput.phoneNumber,
        PickupEmail: userInput.email,
        OrderTotal: grandTotal,
        TotalItems: totalItems,
        OrderDetailsDTO: orderDetailsDTO,
        ApplicationUserId: data.UserId,
        StripePaymentIntentID: data.StripePaymentIntentId,
        Status:
          result.paymentIntent.status === "succeeded"
            ? SD_Status.CONFIRMED
            : SD_Status.PENDING,
      });

      // console.log(response);
      if (response) {
        if (response.data?.Result.Status === SD_Status.CONFIRMED) {
          // ? refers to not null
          // sweetAlertMsgs.successOrderAlert("Order Confirmed", "Go to Orders");
          navigate(
            `/order/orderConfirmed/${response.data?.Result.OrderHeaderId}`
          );
        } else {
          navigate("/failed");
        }
      }
    }
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        disabled={!stripe || isProcessing}
        className="btn btn-success mt-5 w-100"
      >
        <span id="button-text">
          {isProcessing ? "Processing..." : "Submit Order"}
        </span>
      </button>
    </form>
  );
};

export default PaymentForm;
