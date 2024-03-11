import React, { useEffect, useState } from 'react'
import { useGetAllOrdersQuery } from '../../Apis/orderApi'
import { MainLoader } from '../../Components/Page/Common';
import OrderList from '../../Components/Page/Order/OrderList';
import { withAdminAuth } from '../../HOC';

function AllOrders() {
    const {data,isLoading}=useGetAllOrdersQuery("");
    const [orderData,setOrderData]=useState([]);
    // console.log(data.Result);

    useEffect(()=>{
      if(data)
      {
        setOrderData(data.Result);
      }
    },[data]);

    // console.log(orderData);

  return (
    
      <>
      {isLoading && <MainLoader/>}
      {!isLoading && (

        <><div className="d-flex align-items-center justify-content-between mx-5 mt-4">
          <h2 className="mt-2 mb-4" style={{ fontFamily: "Georgia", color: "darkkhaki", fontWeight: "bold" }}>All Orders</h2>

          <div className="d-flex" style={{width:"50%"}}>
            <input type="text" className='form-control mx-2'
              placeholder='Search Name, Email or Phone'
              name='searchString' />
            <select className='form-select w-50 mx-2' name="status">

            </select>
            <button className='btn btn-outline-success'>Filter</button>
          </div>

        </div><div className='mt-2'>
            <OrderList isLoading={isLoading} orderData={orderData} />

          </div></>
        
      )}
      </>
    
  );
}

export default withAdminAuth(AllOrders);
