import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../../../Apis/authApi";
import { inputHelper, toastNotify } from "../../../Helpers";
import { apiResponse, userModel } from "../../../Interfaces";
import { SD_Roles } from "../../../Utility/SD";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../../../Storage/Redux/userAuthSlice";
import MainLoader from "./MainLoader";
import CryptoJS from 'crypto-js';

function LoginModal() {
  const dispatch = useDispatch();
  const [registerUser] = useRegisterUserMutation();
  const [loginUser] = useLoginUserMutation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
    role: "",
    name: "",
  });
  const [userLoginInput, setUserLoginInput] = useState({
    Username: "",
    Password: "",
  });

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleUserInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
    setShowModal(true);
  };

  const handleUserLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userLoginInput);
    setUserLoginInput(tempData);
    setShowModal(true);
  };

  
  //hash the passsword
  const hashPassword=(password: string | CryptoJS.lib.WordArray)=>{
    const hashedPassword=CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
    return hashedPassword;
  }
  
  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const response: apiResponse = await registerUser({
      userName: userInput.userName,
      password: hashPassword(userInput.password),
      role: userInput.role,
      name: userInput.name,
    });
    if (response.data) {
      toastNotify(
        "Registration successful! Please login to continue.",
        "success"
      );
      setUserInput({
        userName: "",
        password: "",
        role: "",
        name: "",
      });
      // console.log(response.data)
    } else if (response.error) {
      toastNotify(response.error.data.ErrorMessages[0], "error");
      // console.log(response.error.data.ErrorMessages[0])
    }
    //   toastNotify("Registeration successful! Please login to continue.");
    //   navigate("/login");
    // } else if (response.error) {
    //   toastNotify(response.error.data.errorMessages[0], "error");
    // }

    setLoading(false);
    setShowModal(false);
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginLoading(true);
    const response: apiResponse = await loginUser({
      userName: userLoginInput.Username,
      password:hashPassword(userLoginInput.Password),
    });
    console.log(response);
    if (response.data) {
      // console.log(response.data);
      const { Token } = response.data.Result;
      const { fullName, id, email, role }: userModel = jwt_decode(Token);
      localStorage.setItem("token", Token);
      dispatch(setLoggedInUser({ fullName, id, email, role }));
      navigate("/");
      toastNotify("Login successful!", "success");
      setUserLoginInput({
        Username: "",
        Password: ""
      })
    } else if (response.error) {
      // console.log(response.error.data.ErrorMessages[0]);
      setError(response.error.data.ErrorMessages[0]);
      toastNotify(response.error.data.ErrorMessages[0], "error");
    }
    setLoginLoading(false);
    setShowModal(false);
  };

  return (
    // <!-- Modal -->
    <div
      className="modal fade"
      id="loginRegisterModal"
      tabIndex={-1}
      aria-labelledby="loginRegisterModalLabel"
      aria-hidden={!showModal}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header  bg-secondary-subtle">
            <h5 className="modal-title" id="loginRegisterModalLabel">
              Login/Register
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {/* <!-- Nav tabs --> */}
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="login-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#login"
                  type="button"
                  role="tab"
                  aria-controls="login"
                  aria-selected="true"
                >
                  Login
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="register-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#register"
                  type="button"
                  role="tab"
                  aria-controls="register"
                  aria-selected="false"
                >
                  Register
                </button>
              </li>
            </ul>

            {/* <!-- Tab panes --> */}
            <div className="tab-content">
              {/* <!-- Login form --> */}
              <div
                className="tab-pane fade show active"
                id="login"
                role="tabpanel"
                aria-labelledby="login-tab"
              >
                {/* {loginLoading && <MainLoader/>} */}
                <form method="post" onSubmit={handleLoginSubmit}>
                  <div className="mb-3 mt-4">
                    <label htmlFor="loginUsername" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="loginUsername"
                      name="Username"
                      placeholder="Enter your username"
                      value={userLoginInput.Username}
                      onChange={handleUserLoginInput}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="loginPassword" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="loginPassword"
                      name="Password"
                      placeholder="Enter your password"
                      value={userLoginInput.Password}
                      onChange={handleUserLoginInput}
                      required
                    />
                  </div>
                  {error && <p className="text-danger text-center">{error}</p>}
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </form>
              </div>

              {/* <!-- Register form --> */}
              <div
                className="tab-pane fade"
                id="register"
                role="tabpanel"
                aria-labelledby="register-tab"
              >
                <form method="post" onSubmit={handleRegisterSubmit}>
                  <div className="mb-3 mt-3">
                    <label htmlFor="registerUsername" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="registerUsername"
                      name="userName"
                      placeholder="Enter your username"
                      value={userInput.userName}
                      onChange={handleUserInput}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="registerName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="registerName"
                      placeholder="Enter your name"
                      name="name"
                      value={userInput.name}
                      onChange={handleUserInput}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="registerPassword" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="registerPassword"
                      placeholder="Enter your password"
                      name="password"
                      value={userInput.password}
                      onChange={handleUserInput}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <select
                      className="form-control form-select"
                      required
                      value={userInput.role}
                      name="role"
                      onChange={handleUserInput}
                    >
                      <option value="" style={{ fontWeight: "bold" }}>
                        --Select Role--
                      </option>
                      <option value={`${SD_Roles.CUSTOMER}`}>Customer</option>
                      <option value={`${SD_Roles.ADMIN}`}>Admin</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
