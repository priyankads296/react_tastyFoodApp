import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { buildQueries } from "@testing-library/react";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44336/api/",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({                         //for POST method
      query: (userData) => ({
        url: "auth/register",
        method: "POST",
        headers:{
          "Content-type":"application/json"
        },
        body:userData
      }),
      
    }),
    loginUser: builder.mutation({                         //for POST method
      query: (userCredentials) => ({
        url: "auth/login",
        method: "POST",
        headers:{
          "Content-type":"application/json"
        },
        body:userCredentials
      }),
      
    })
  }),
});

export const { useRegisterUserMutation,useLoginUserMutation } = authApi;
export default authApi;
