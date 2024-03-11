import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const paymentApi=createApi({
    reducerPath:"paymentApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"https://localhost:44336/api/",
        prepareHeaders:(headers:Headers,api)=>{                         //to authorize user, we have to send token with the api call
            const token=localStorage.getItem("token");
            token && headers.append("Authorization","Bearer "+token);     //don't forget to add space after Bearer
          }
    }),
    endpoints:(builder)=>({
        initiatePayment:builder.mutation({
            query:(userId)=>({
                url:"Payment",
                method:'POST',
                params:{
                    userId:userId
                }
            })
            
        })
        
    })
});

export const {useInitiatePaymentMutation}=paymentApi;
export default paymentApi;