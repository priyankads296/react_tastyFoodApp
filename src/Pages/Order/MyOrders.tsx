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
        <><div className="d-flex align-items-center justify-content-between mx-5 mt-4">
        <h2 className="mt-2 mb-4" style={{ fontFamily: "Georgia", color: "darkkhaki", fontWeight: "bold" }}>My Orders</h2>

        <div className="d-flex" style={{width:"50%"}}>
          <input type="text" className='form-control mx-2'
            placeholder='Search Name, Email or Phone'
            name='searchString' />
          <select className='form-select w-50 mx-2' name="status">

          </select>
          <button className='btn btn-outline-success'>Filter</button>
        </div>

      </div><div className='mt-2'>
          <OrderList isLoading={isLoading} orderData={data.Result} />

        </div></>
        // <OrderList isLoading={isLoading} orderData={data.Result} />
        //create a button 
        

      )}
    </>
  );
}

export default withAuth(MyOrders);
