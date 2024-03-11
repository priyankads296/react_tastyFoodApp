import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useGetMenuItemByIdQuery } from "../Apis/menuItemApi";
import { useNavigate } from "react-router-dom";
import { useUpdateShoppingCartMutation } from "../Apis/shoppingCartApi";
import { MainLoader, MiniLoader } from "../Components/Page/Common";
import { apiResponse, userModel } from "../Interfaces";
import { toastNotify } from "../Helpers";
import { useSelector } from "react-redux";
import { RootState } from "../Storage/Redux/store";
//userid=be2d4a3f-88c0-4097-a884-2e9844024c5c

function MenuItemDetails() {
  const { menuItemId } = useParams();
  const { data, isLoading } = useGetMenuItemByIdQuery(menuItemId);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();
  const userData:userModel=useSelector((state:RootState)=>state.userAuthStore);
  // console.log(data);

  const handleQuantity = (counter: number) => {
    let newQuantity = quantity + counter;
    if (newQuantity == 0) newQuantity = 1;
    setQuantity(newQuantity);
    return;
  };

  const handleAddToCart = async (menuItemId: number) => {
    if(!userData.id)
    {
      toastNotify("Please Login to continue","error");
        navigate("/");
        return;
    }
    setIsAddingToCart(true);

    const response:apiResponse = await updateShoppingCart({
      menuItemId: menuItemId,
      updateQuantityBy: quantity,
      userId: userData.id
    });

    if(response.data && response.data.IsSuccess){
      toastNotify("Item added to cart Successfully!","success");
    }

    console.log(response);
    setIsAddingToCart(false);
  };

  return (
    
    <div
      className="container pt-4 pt-md-5"
      style={{ fontFamily: "sans-serif" }}
    >
      {!isLoading ? (
        <div className="row">
          <div className="col-7">
            <h2 className="text-secondary" style={{ fontWeight: "bold" }}>
              {data.Result?.Name}
            </h2>
            <span>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                }}
              >
                <span
                  className="badge text-bg-dark pt-2"
                  style={{ height: "30px", fontSize: "15px" }}
                >
                  {data.Result?.Category}
                </span>

                <span
                  className="badge text-bg-light pt-2 text-success"
                  style={{
                    height: "40px",
                    fontSize: "20px",
                    fontFamily: "cursive",
                  }}
                >
                  {data.Result?.SpecialTag}
                </span>
              </div>
            </span>

            <p style={{ fontSize: "20px" }} className="pt-2">
              {data.Result?.Description}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "80%",
              }}
            >
              <span className="h3 text-danger">
                <i className="bi bi-currency-rupee"></i>
                {data.Result?.Price + ".00"}
              </span>{" "}
              &nbsp;&nbsp;&nbsp;
              <span
                className="p-1  "
                style={{ border: "1px solid #333", borderRadius: "30px" }}
              >
                <i
                  onClick={() => {
                    handleQuantity(-1);
                  }}
                  className="bi bi-dash p-1"
                  style={{ fontSize: "25px", cursor: "pointer" }}
                ></i>
                <span className="h3 mt-3 px-3">{quantity}</span>
                <i
                  onClick={() => {
                    handleQuantity(1);
                  }}
                  className="bi bi-plus p-1"
                  style={{ fontSize: "25px", cursor: "pointer" }}
                ></i>
              </span>
            </div>
            <div className="row pt-4">
              <div className="col-5">
                {isAddingToCart ? (
                  <button disabled className="btn btn-success form-control">
                    <MiniLoader />
                  </button>
                  
                ) : (
                  <button
                    className="btn btn-success form-control"
                    onClick={() => handleAddToCart(data.Result?.Id)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>

              <div className="col-5 ">
                <button
                  className="btn btn-secondary form-control"
                  onClick={() => navigate(-1)}
                >
                  {/* navigate(-1) will take you to the last page */}
                  Back to Home
                </button>
              </div>
            </div>
          </div>
          <div className="col-5">
            <img
              src={data.Result?.Image}
              width="80%"
              style={{ borderRadius: "50%" }}
              alt="No content"
            ></img>
          </div>
        </div>
      ) : (
        <div
          className="d-flex justify-contemt-center"
          style={{ width: "100%" }}
        >
          <MainLoader />
        </div>
      )}
    </div>
  );
}

export default MenuItemDetails;
