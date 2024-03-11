import React from 'react'
import { CartPickupDetails, CartSummary } from '../Components/Page/Cart';
import { withAuth } from '../HOC';

function ShoppingCart() {
  return (
    <div className="row w-100" style={{ paddingTop: "10px"}} >
      <div className="col-lg-6 col-12" style={{ fontWeight: 300 }}>
        <CartSummary/>
      </div>
      <div className="col-lg-6 col-12 p-4 d-flex justify-content-end "style={{ height: "550px"}}>
        <CartPickupDetails/>
      </div>
    </div>
  );
}

export default withAuth(ShoppingCart);
