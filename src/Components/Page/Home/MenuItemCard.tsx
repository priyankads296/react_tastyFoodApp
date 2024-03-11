import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useUpdateShoppingCartMutation } from "../../../Apis/shoppingCartApi";
import { toastNotify } from "../../../Helpers";
import { apiResponse, menuItemModel, userModel } from "../../../Interfaces";
import { RootState } from "../../../Storage/Redux/store";
import { MiniLoader } from "../Common";
import {useNavigate} from "react-router-dom";

interface Props {
  menuItem: menuItemModel;
}

function MenuItemCard(props: Props) {
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();
  const userData:userModel=useSelector((state:RootState)=>state.userAuthStore);
  const navigate=useNavigate();
  const handleAddToCart = async (menuItemId: number) => {
    
    if(!userData.id)
    {
      toastNotify("Please Login to continue","error");
        navigate("/");
        return;
    }
    setIsAddingToCart(true);

    const response :apiResponse= await updateShoppingCart({
      menuItemId: menuItemId,
      updateQuantityBy: 1,
      userId: userData.id,
    });
    if(response.data && response.data.IsSuccess)
    {
      toastNotify("Item added to cart successfully!","success");
    }
    // console.log(response);
    setIsAddingToCart(false);
  };

  return (
    <div className="col-md-4 col-12 p-4 ">
      <div
        className="card "
        style={{
          border: "1px offset gray",
          width: "18rem",
          minHeight: "23rem",
        }}
      >
        <Link to={`/menuItemDetails/${props.menuItem.Id}`}>
          <img
            src={props.menuItem.Image}
            alt=""
            className="card-img-top w-100"
            style={{ height: "12rem" }}
          />
        </Link>

        <div className="card-body">
          <div className=" d-flex justify-content-between align-items-center">
            <div>
              <p
                className="card-text "
                style={{
                  borderRadius: 0,
                  color: "brown",
                  fontWeight: "bold",
                  letterSpacing: "0.1em",
                }}
              >
                {props.menuItem.Category}
              </p>
            </div>
            <div>
              {props.menuItem.SpecialTag !== "" ? (
                <>
                  <p
                    className="card-text badge bg-success-subtle text-muted"
                    style={{
                      borderRadius: 0,
                      padding: "none",
                      display: "flex",
                    }}
                  >
                    <i className="bi bi-star-fill"></i> &nbsp;{" "}
                    {props.menuItem.SpecialTag}
                  </p>
                </>
              ) : null}
            </div>
          </div>
          {/* <div className="d-flex justify-content-between align-items-center" style={{textAlign:"right"}}>
           
            {props.menuItem.SpecialTag !== "" ? (
              <>
                  
                  <p
                    className="card-text badge bg-success-subtle text-muted"
                    style={{ borderRadius: 0, padding: "none", display: "flex"}}
                  ><i className="bi bi-star-fill"></i>
                    {" "}
                    &nbsp; {props.menuItem.SpecialTag}
                  </p>
                
              </>
            ) : null}
          </div> */}

          <Link
            to={`/menuItemDetails/${props.menuItem.Id}`}
            style={{ textDecoration: "none" }}
          >
            <h5
              className="card-title pt-2 dishName"
              style={{ color: "darkGreen" }}
            >
              {props.menuItem.Name}
            </h5>
          </Link>
          <p className="card-text">{props.menuItem.Description}</p>
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center">
          <div>
            <h6 className="text-primary">
              <i className="bi bi-currency-rupee"></i>
              {props.menuItem.Price + ".00"}&nbsp;
            </h6>
            {/* <i className="bi bi-heart" style={{ cursor: "pointer" }}></i> */}
          </div>
          <div>
            <i className="bi bi-heart me-2" style={{ cursor: "pointer" }}></i>
            {isAddingToCart ? (
              <div style={{
                position:"absolute",
                top:"15px",
                right:"15px",
              }}>
                <MiniLoader/>

              </div>
            ) : (
              <i
                className="bi bi-cart-plus text-danger"
                style={{ cursor: "pointer" }}
                onClick={() => handleAddToCart(props.menuItem.Id)}
              ></i>
            )}
          </div>
        </div>

        {/* <i
            className="bi bi-star btn btn-success"
            style={{
              position: "absolute",
              top: "15px",
              left: "15px",
              padding: "5px 10px",
              borderRadius: "3px",
              outline: "none !important",
              cursor: "pointer",
            }}
          >
            &nbsp; SPECIAL
          </i>

          <i
            className="bi bi-cart-plus btn btn-outline-danger"
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              padding: "5px 10px",
              borderRadius: "3px",
              outline: "none !important",
              cursor: "pointer",
            }}
          ></i>

          <div className="text-center">
            <p className="card-title m-0 text-success fs-3">name</p>
            <p className="badge bg-secondary" style={{ fontSize: "12px" }}>
              category
            </p>
          </div>
          <p className="card-text" style={{ textAlign: "center" }}>
            Description
          </p>
          <div className="row text-center">
            <h4>$10</h4>
          </div> */}
      </div>
    </div>
  );
}

export default MenuItemCard;
