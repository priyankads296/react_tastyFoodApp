import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { buildQueries } from "@testing-library/react";

const shoppingCartApi = createApi({
  reducerPath: "shoppingCartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44336/api/",
    prepareHeaders:(headers:Headers,api)=>{                         //to authorize user, we have to send token with the api call
      const token=localStorage.getItem("token");
      token && headers.append("Authorization","Bearer "+token);     //don't forget to add space after Bearer
    }
  }),
  tagTypes: ["ShoppingCarts"],

  endpoints: (builder) => ({
    getShoppingCart: builder.query({                            //for GET method
      query: (userId) => ({
        url: `ShoppingCart`,
        params: {
          userId: userId,
        },
      }),
      providesTags: ["ShoppingCarts"],
    }),

    updateShoppingCart: builder.mutation({                         //for POST method
      query: ({ menuItemId, updateQuantityBy, userId }) => ({
        url: "ShoppingCart",
        method: "POST",
        params: {
          menuItemId:menuItemId,
          updateQuantityBy:updateQuantityBy,
          userId:userId,
        },
      }),
      invalidatesTags:["ShoppingCarts"]
    }),
  }),
});

export const { useGetShoppingCartQuery,useUpdateShoppingCartMutation } = shoppingCartApi;
export default shoppingCartApi;
