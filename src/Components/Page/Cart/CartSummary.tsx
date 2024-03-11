import React from "react";
import { useSelector ,useDispatch} from "react-redux";
import { useUpdateShoppingCartMutation } from "../../../Apis/shoppingCartApi";
import { cartItemModel, userModel } from "../../../Interfaces";
import { removeFromCart, updateQuantity } from "../../../Storage/Redux/shoppingCartSlice";
import { RootState } from "../../../Storage/Redux/store";

function CartSummary() {
  const dispatch=useDispatch();
  // const shoppingCartFromStore: cartItemModel[] = useSelector(
  //   //fetching data from store
  //   (state: RootState) => state.shoppingCartStore.cartItems ?? []
    
  // );
  const [updateShoppingCart] = useUpdateShoppingCartMutation();
  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.CartItems ?? []
  );
  const userData:userModel=useSelector((state:RootState)=>state.userAuthStore);
  // console.log(shoppingCartFromStore);
  if (shoppingCartFromStore.length==0) {
    return <div className="text-center text-danger" style={{fontWeight:"bold",marginTop:"200px"}}><h2>Shopping Cart Empty</h2></div>;
  }
  
  
  const handleQuantity=(updateQuantityBy:number,cartItem:cartItemModel)=>{
    if((updateQuantityBy==-1 && cartItem.Quantity==1) || updateQuantityBy==0)
    {
      //remove the item
      dispatch(removeFromCart({cartItem,Quantity:0}))
      console.log("remove");
      updateShoppingCart({
        menuItemId:cartItem.MenuItem?.Id,
        updateQuantityBy:0,
        userId:userData.id

      })
    }
    else{
      //update the quantity with new quantity
      updateShoppingCart({
        menuItemId:cartItem.MenuItem?.Id,
        updateQuantityBy:updateQuantityBy,
        userId:userData.id

      })
      dispatch(updateQuantity({cartItem,Quantity:cartItem.Quantity!+updateQuantityBy}))
      
    }
  }

  return (
    <div className="container p-4" style={{marginLeft:"30px",backgroundColor:"white !important"}}>
      <h3 className="text-success ps-3 pb-3 " style={{fontFamily:"Times New Roman",fontWeight:"bold"}}>Cart Summary</h3>

      {shoppingCartFromStore.map((cartItem: cartItemModel, index: number) => (
        <div key={index}
          className="d-flex flex-sm-row flex-column align-items-center custom-card-shadow mb-3"
          style={{ background: "ghostwhite" ,height:"100px",width:"100%" ,border:"1px solid rgb(235, 232, 232)"}}
        >
          <div className="p-3">
            <img
              src={cartItem.MenuItem?.Image}
              alt=""
              width={"80px"}
              className="rounded-circle"
            />
          </div>

          <div className="p-2 mx-3" style={{ width: "100%" }}>
            <div className="d-flex justify-content-between align-items-center" style={{paddingTop:"30px"}}>
              <h4  style={{ fontWeight: "bold" ,fontSize:"1rem",fontFamily:"monospace",color:"rgb(89, 44, 41)"}}>{cartItem.MenuItem?.Name}</h4>
              <h4 className="text-secondary" style={{fontSize:"1rem"}}>
                <i className="bi bi-currency-rupee"></i>
                {(cartItem.Quantity! * cartItem.MenuItem!.Price).toFixed(2)}
              </h4>
            </div>
            <div className="flex">
              <h4 className="text-danger" style={{fontSize:"1rem"}}>
              <i className="bi bi-currency-rupee"></i>
                {cartItem.MenuItem?.Price}
              </h4>
            </div>
            <div className="d-flex justify-content-between">
              <div
                className="d-flex justify-content-between p-1 rounded-pill custom-card-shadow  "
                style={{
                  width: "100px",
                  height: "53px",
                }}
              >
                <span style={{ color: "rgba(22,22,22,.7)" }} role="button">
                  <i className="bi bi-dash-circle-fill" onClick={()=>handleQuantity(-1,cartItem)}></i>
                </span>
                <span>
                  <b>{cartItem.Quantity}</b>
                </span>
                <span style={{ color: "rgba(22,22,22,.7)" }} role="button">
                  <i className="bi bi-plus-circle-fill" onClick={()=>handleQuantity(+1,cartItem)}></i>
                </span>
              </div>

              <span className="text-danger" style={{ color: "rgba(22,22,22,.7)" }} role="button">
                <i className="bi bi-trash-fill" onClick={()=>handleQuantity(0,cartItem)}></i>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartSummary;
