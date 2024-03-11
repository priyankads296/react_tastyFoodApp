import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Footer, Header } from "../Components/Layout";

import {
  AccessDenied,
  AllOrders,
  AuthenticationTest,
  AuthenticationTestAdmin,
  Home,
  MenuItemDetails,
  MenuItemList,
  MenuItemUpsert,
  MyOrders,
  NotFound,
  OrderConfirmed,
  OrderDetails,
  Payment,
  ShoppingCart,
} from "../Pages";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetShoppingCartQuery } from "../Apis/shoppingCartApi";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";
import { userModel } from "../Interfaces";
import jwt_decode from "jwt-decode";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import { RootState } from "../Storage/Redux/store";

function App() {
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(true);
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const { data, isLoading } = useGetShoppingCartQuery(userData.id, {
    skip: skip,                 //if we dont use skip getApi will be fetched twice, one without userId and another with userId
  }); //get shopping cart api

  //shopping cart details
  useEffect(() => {
    if (!isLoading  && data) {
      // console.log(data.Result);
      dispatch(setShoppingCart(data.Result?.CartItems));
    }
  }, [data]);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const { fullName, id, email, role }: userModel = jwt_decode(localToken);
      dispatch(setLoggedInUser({ fullName, id, email, role }));
    }
  }, []);

  useEffect(() => {
    if (userData.id) setSkip(false);
  });
  return (
    <div>
      <Header />
      {/* backgroundColor:"rgb(242, 241, 240)" */}
      <div className="pb-5" style={{ minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="*" element={<NotFound />}></Route>
          <Route
            path="/menuItemDetails/:menuItemId"
            element={<MenuItemDetails />}
          ></Route>
          <Route path="/shoppingCart" element={<ShoppingCart />}></Route>
          <Route
            path="/authentication"
            element={<AuthenticationTest />}
          ></Route>
          <Route
            path="/authorization"
            element={<AuthenticationTestAdmin />}
          ></Route>
          <Route path="/accessDenied" element={<AccessDenied />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route
            path="/order/orderConfirmed/:id"
            element={<OrderConfirmed />}
          ></Route>
          <Route path="/order/myOrders" element={<MyOrders />}></Route>
          <Route
            path="/order/orderDetails/:id"
            element={<OrderDetails />}
          ></Route>
          <Route path="/order/allOrders" element={<AllOrders />}></Route>
          <Route
            path="/menuItem/menuItemList"
            element={<MenuItemList />}
          ></Route>
          <Route
            path="/menuItem/menuItemUpsert/:id"
            element={<MenuItemUpsert />}
          ></Route>
          <Route
            path="/menuItem/menuItemUpsert"
            element={<MenuItemUpsert />}
          ></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
