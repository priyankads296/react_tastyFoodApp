import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { sweetAlertMsgs } from "../../Helpers";
import "../../index.css";
import { cartItemModel, userModel } from "../../Interfaces";
import { RootState } from "../../Storage/Redux/store";
import {
  emptyUserState,
  setLoggedInUser,
} from "../../Storage/Redux/userAuthSlice";
import { SD_Roles } from "../../Utility/SD";
import { LoginModal, LogoutPopup } from "../Page/Common";

let logo = require("../../Assets/Images/food-logo.png");

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [showLogoutPopup,setShowLogoutPopup]=useState(false);
  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.CartItems ?? []
  );

  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setLoggedInUser({ ...emptyUserState })); //resets the user
    // setShowLogoutPopup(true);
    sweetAlertMsgs.sweetAlertMsg("Are you sure you want to Logout?");
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md bg-secondary-subtle justify-content-center py-0 lead">
        <div className="container">
          <NavLink to="/" className="navbar-brand d-flex w-50 me-auto">
            <img src={logo} style={{ height: "40px" }} className="m-1" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsingNavbar3"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="navbar-collapse collapse w-100"
            id="collapsingNavbar3"
          >
            <ul className="navbar-nav w-100 justify-content-center">
              <li className="nav-item py-0 active">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>

              <li className="nav-item py-0">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
              <li className="nav-item py-0">
                <a className="nav-link" href="#">
                  Contact
                </a>
              </li>

              {userData.role == SD_Roles.ADMIN ? (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarScrollingDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {" "}
                    Admin Panel
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="navbarScrollingDropdown"
                  >
                    <li
                      style={{ cursor: "pointer" }}
                      className="dropdown-item"
                      onClick={() => navigate("/order/myOrders")}
                    >
                      My Orders
                    </li>
                    <li
                      style={{ cursor: "pointer" }}
                      className="dropdown-item"
                      onClick={() => navigate("/order/allOrders")}
                    >
                      All Orders
                    </li>

                    <li
                      style={{ cursor: "pointer" }}
                      className="dropdown-item"
                      onClick={() => navigate("/menuItem/menuItemList")}
                    >
                      Menu Items List
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item py-0 active">
                  <NavLink className="nav-link" to="/order/myOrders">
                    Orders
                  </NavLink>
                </li>
              )}

              <li className="nav-item py-0">
                <NavLink className="nav-link" to="/shoppingCart">
                  Cart&nbsp;
                  <span style={{ fontFamily: "initial" }}>
                    {userData.id &&
                      `(${
                        shoppingCartFromStore != undefined
                          ? shoppingCartFromStore.length
                          : "0"
                      })`}
                  </span>
                  &nbsp;
                </NavLink>
              </li>

              {/* <li className="nav-item py-0">
                <NavLink className="nav-link" to="/authentication">
                  Authentication
                </NavLink>
              </li>
              <li className="nav-item py-0">
                <NavLink className="nav-link" to="/authorization">
                  Authorization
                </NavLink>
              </li> */}
            </ul>

            <ul className="nav navbar-nav ms-auto w-100 justify-content-end auth">
              {userData.id && (
                <>
                  <li className="nav-item py-0">
                    <button
                      className="btn btn-secondary nav-link active btn-small"
                      style={{
                        background: "transparent",
                        border: 0,
                        fontSize: "1rem",
                        color: "brown",
                      }}
                      // data-bs-toggle="modal"
                      // data-bs-target="#logoutModal"
                    >
                      Welcome,{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {userData.fullName}
                      </span>
                    </button>
                  </li>
                  <li className="nav-item py-0">
                    {/* {showLogoutPopup && <LogoutPopup message="Are you sure you want to logout?" onClose={handleCloseLogoutPopup}/>} */}
                    <button
                      className="btn btn-outline-danger  nav-link btn-small"
                      type="button"
                      style={{ fontSize: "1rem" }}
                      // data-bs-toggle="modal"
                      // data-bs-target="#logoutModal"
                      onClick={handleLogout}
                    >
                      Logout&nbsp;<i className="bi bi-box-arrow-right"></i>
                    </button>
                  </li>
                </>
              )}

              {!userData.id && (
                <>
                  <li className="nav-item py-0">
                    <button
                      className="btn btn-secondary nav-link btn-small"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#loginRegisterModal"
                    >
                      Register
                    </button>
                  </li>
                  <li className="nav-item py-0">
                    <button
                      className="btn btn-success nav-link btn-small"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#loginRegisterModal"
                    >
                      Login
                    </button>
                  </li>
                </>
              )}
              <LoginModal />
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
