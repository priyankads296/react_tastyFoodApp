import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const menuItemApi = createApi({
  reducerPath: "menuItemApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44336/api/",
    prepareHeaders:(headers:Headers,api)=>{                         //to authorize user, we have to send token with the api call
      const token=localStorage.getItem("token");
      token && headers.append("Authorization","Bearer "+token);     //don't forget to add space after Bearer
    }
  }),
  tagTypes: ["MenuItems"],
  endpoints: (builder) => ({
    getMenuItems: builder.query({
      query: () => ({
        url: "MenuItem",
      }),
      providesTags: ["MenuItems"],
    }),
    getMenuItemById: builder.query({
      query: (id) => ({
        url: `MenuItem/${id}`,
      }),
      providesTags: ["MenuItems"],
    }),
    createMenuItem: builder.mutation({
      query: (data) => ({
        url: "MenuItem",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["MenuItems"],
    }),
    updateMenuItem: builder.mutation({
      query: ({ data, id }) => ({
        url: "MenuItem/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["MenuItems"],
    }),
    deleteMenuItem: builder.mutation({
      query: (id) => ({
        url: "MenuItem/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["MenuItems"],
    }),
  }),
});

export const {
  useGetMenuItemsQuery,
  useGetMenuItemByIdQuery,
  useDeleteMenuItemMutation,
  useUpdateMenuItemMutation,
  useCreateMenuItemMutation
} = menuItemApi;
export default menuItemApi;
