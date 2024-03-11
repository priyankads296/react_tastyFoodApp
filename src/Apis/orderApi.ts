import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44336/api/",
    prepareHeaders:(headers:Headers,api)=>{                         //to authorize user, we have to send token with the api call
      const token=localStorage.getItem("token");
      token && headers.append("Authorization","Bearer "+token);     //don't forget to add space after Bearer
    }
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderDetails) => ({
        url: "Order",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: orderDetails,
      }),
      invalidatesTags: ["Orders"],
    }),
    // getAllOrders: builder.query({
    //     query: ({ userId, searchString, status, pageNumber, pageSize }) => ({
    //       url: "order",
    //       params: {
    //         ...(userId && { userId }),
    //         ...(searchString && { searchString }),
    //         ...(status && { status }),
    //         ...(pageSize && { pageSize }),
    //         ...(pageNumber && { pageNumber }),
    //       },
    //     }),
    // })
    getAllOrders: builder.query({
      query: ({ userId }) => ({
        url: "Order",
        params: {
          userId: userId,
        },
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `Order/${id}`,
      }),
      providesTags: ["Orders"],
    }),
    updateOrderHeader: builder.mutation({
      query: (orderDetails) => ({
        url: "Order/" + orderDetails.OrderHeaderId,
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: orderDetails,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderDetailsQuery,
  useUpdateOrderHeaderMutation
} = orderApi;
export default orderApi;
