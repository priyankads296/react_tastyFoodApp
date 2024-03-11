import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchItem } from "../../../Storage/Redux/menuItemSlice";
import "./banner.css";
function Banner() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchItem(e.target.value));
    setValue(e.target.value);
  };

  return (
    <div className="custom-banner">
      <div
        className="m-auto d-flex align-items-center"
        style={{
        height: "50vh",
        }}
      >
        <div className="d-flex flex-column align-items-center" style={{ width: "100%" }}>
          {/* <input
            type={"text"}
            className="form-control rounded-pill"
            style={{
              width: "100%",
              padding: "20px 20px",
            }}
            value={value}
            onChange={handleChange}
            placeholder="Search for Food Items!"
          /> */}
          {/* <span style={{ position: "relative", left: "-43px" }}>
            <i className="bi bi-search"></i>
          </span> */}
          <div className="bannerText">
            <h1>Indulge in Delicious Delights  </h1>
            
           
          </div>
          <div style={{position:"relative",marginTop:"5px"}}>
            <input
            type={"text"}
            className="form-control rounded-pill"
            style={{
              width: "350px",
              padding: "8px 5px",
                 boxShadow:"0 0 4px 0px",          
              textAlign:"center",
              fontSize:"0.9rem"
            }}
            value={value}
            onChange={handleChange}
            placeholder="Explore our Menu Today !!!"
          /> 
          <span style={{ position: "absolute", left: "15px",top:"8px"}}>
            <i className="bi bi-search"></i>
          </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;