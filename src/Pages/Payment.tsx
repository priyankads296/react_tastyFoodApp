import React from "react";
import { useLocation } from "react-router";
import { hashText } from "../Helpers";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentForm } from "../Components/Page/Payment";
import { OrderSummary } from "../Components/Page/Order";

function Payment() {
  const {
    state: { apiResult, userInput },
  } = useLocation();

  const stripePromise = loadStripe(
    "pk_test_51OiF38SEbd9EHU3gSn6YZxeLGui7FwJdhJ2EBfRjg5KRGCg1PNo29gYWPTmC7hTCPpMLznZwt3lJIxeEQI8yenFs00wyoDzDWW"
  );
  const options = {
    // passing the client secret obtained from the server
    clientSecret: apiResult.ClientSecret,
  };
//    console.log(apiResult);
//    console.log(userInput);
  //  console.log(hashText(userInput.Password));
  return (
    <Elements stripe={stripePromise} options={options}>
      <div className="container pt-5">
        <div className="row">
          <div className="col-md-7">
            <OrderSummary data={apiResult} userInput={userInput}/>
          </div>
          <div className="col-md-5 mt-5">
            <PaymentForm data={apiResult} userInput={userInput}/>
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default Payment;
