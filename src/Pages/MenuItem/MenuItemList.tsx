import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteMenuItemMutation, useGetMenuItemsQuery } from "../../Apis/menuItemApi";
import { MainLoader } from "../../Components/Page/Common";
import { withAuth } from "../../HOC";
import { menuItemModel } from "../../Interfaces";

function MenuItemList() {
  //   const [isLoading, setIsLoading] = useState(false);
  const { data, isLoading } = useGetMenuItemsQuery(null);
  const [deleteMenuItem]=useDeleteMenuItemMutation();
//   console.log(data);
  const navigate = useNavigate();

  const handleMenuItemDelete=async(id:number)=>{
    toast.promise(
        deleteMenuItem(id),
        {
          pending: "Processing your request...",
          success: "Menu Item Deleted Successfully 👌",
          error: "Error encoutered 🤯",
        },
        {
          theme: "dark",
        }
    )
  }
  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div
          className="container"
          style={{ fontFamily: "'Roboto', sans-serif" }}
        >
          <div className="d-flex justify-content-between align-items-center mt-5 mb-2">
            <h2
              className="mb-4"
              style={{
                color: "rgb(46, 170, 100)",
                fontFamily: "'Libre Franklin', sans-serif",
              }}
            >
              Menu List
            </h2>
            <button
              className="btn btn-primary ms-auto"
              style={{
                backgroundColor: "rgb(46, 170, 100)",
                color: "white",
                
                border: "none",
              }}
              onClick={() =>
                navigate("/menuItem/menuItemUpsert")
              }
            >
              <i className="bi bi-plus"></i>Add Item
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Special Tag</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody
                style={{
                  fontSize: "0.9em",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                {data.Result?.map((menuItem: menuItemModel) => {
                  return (
                    <tr>
                      <td className="d-none d-md-table-cell">
                        <img
                          src={menuItem.Image}
                          alt="no content"
                          style={{
                            width: "80%",
                            maxWidth: "100px",
                            height: "80px",
                          }}
                        />
                      </td>
                      <td className="pt-4" style={{ fontWeight: "bold" }}>
                        {menuItem.Id}
                      </td>
                      <td className="pt-4" style={{ fontWeight: "bold" }}>
                        {menuItem.Name}
                      </td>
                      <td className="pt-4">{menuItem.Category}</td>
                      <td className="text-danger pt-4">
                        <i className="bi bi-currency-rupee"></i>
                        {menuItem.Price}
                      </td>
                      <td className="text-warning pt-4">
                        {menuItem.SpecialTag ? menuItem.SpecialTag : "-"}
                      </td>
                      <td colSpan={4} className="pt-4">
                        <div className="row">
                          <div className="col-md-6 d-flex justify-content-between">
                            <button className="btn btn-success">
                              <i
                                className="bi bi-pencil-fill"
                                onClick={() =>
                                  navigate(
                                    "/menuItem/menuItemUpsert/" + menuItem.Id
                                  )
                                }
                              ></i>
                            </button>
                            <button
                              className="btn btn-danger mx-2"
                              onClick={() => handleMenuItemDelete(menuItem.Id)}
                            >
                              <i className="bi bi-trash-fill"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default withAuth(MenuItemList);
