import React from "react";
import { useSelector } from "react-redux";
import { useGetAllOrdersQuery } from "../../Apis/orderApi";
import { MainLoader } from "../../Components/Page/Common";
import { withAuth } from "../../HOC";
import { RootState } from "../../Storage/Redux/store";
import "./MyOrders.css";
import OrderList from "../../Components/Page/Order/OrderList";

function MyOrders() {
  const userId = useSelector((state: RootState) => state.userAuthStore.id);
  const { data, isLoading } = useGetAllOrdersQuery({userId});
  console.log(data);
  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <OrderList isLoading={isLoading} orderData={data.Result} />
      )}
    </>
  );
}

export default withAuth(MyOrders);
