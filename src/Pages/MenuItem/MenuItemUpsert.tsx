import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateMenuItemMutation, useGetMenuItemByIdQuery, useUpdateMenuItemMutation } from "../../Apis/menuItemApi";
import { MainLoader } from "../../Components/Page/Common";
import { inputHelper, toastNotify } from "../../Helpers";
import { SD_Categories } from "../../Utility/SD";

function MenuItemUpsert() {
  const Categories = [
    SD_Categories.APPETIZER,
    SD_Categories.BEVERAGES,
    SD_Categories.DESSERT,
    SD_Categories.ENTREE,
  ];

  const menuItemData = {
    Name: "",
    Description: "",
    SpecialTag: "",
    Category: Categories[0],
    Price: "",
  };
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [menuItemInputs, setMenuItemInputs] = useState(menuItemData);
  const [imageToDisplay, setImageToDisplay] = useState<string>("");
  const [imageToStore, setImageToStore] = useState<any>();
  const [createMenuItem]=useCreateMenuItemMutation();
  const [updateMenuItem]=useUpdateMenuItemMutation();
  const navigate=useNavigate();

  const {data}=useGetMenuItemByIdQuery(id);

  //we use this to automatically updata data in the form when we click update or when "data" is modified
  useEffect(()=>{
    if(data && data.Result){
      const tempData = {
        Name: data.Result.Name,
        Description: data.Result.Description,
        SpecialTag: data.Result.SpecialTag,
        Category: data.Result.Category,
        Price: data.Result.Price,
      };
      setMenuItemInputs(tempData);
      setImageToDisplay(data.Result.Image);
    }
  },[data])

  const handleMenuItemInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, menuItemInputs);
    setMenuItemInputs(tempData);
  };

  //handle pic
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]; //retrieve first file uploaded
    if (file) {
      const imgType = file.type.split("/")[1];
      const validImgTypes = ["jpeg", "jpg", "png"];

      const isImageTypeValid = validImgTypes.filter((e) => {
        return e === imgType;
      });

      if (file.size > 1000 * 1024) {
        setImageToStore("");
        toastNotify("File Must be less then 1 MB", "error");
        return;
      } else if (isImageTypeValid.length === 0) {
        setImageToStore("");
        toastNotify("File Must be in jpeg, jpg or png", "error");
        return;
      }

      //image store locally
      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImageToStore(file);
      reader.onload = (e) => {
        const imgUrl = e.target?.result as string;
        setImageToDisplay(imgUrl);
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!imageToStore && !id) {
      toastNotify("Please upload an image", "error");
      setLoading(false);
      return;
    }

    const formData = new FormData();

    //adding all data from the form to formData 
    formData.append("Name", menuItemInputs.Name);
    formData.append("Description", menuItemInputs.Description);
    formData.append("SpecialTag", menuItemInputs.SpecialTag ?? "");
    formData.append("Category", menuItemInputs.Category);
    formData.append("Price", menuItemInputs.Price);
    if (imageToDisplay) 
      formData.append("File", imageToStore);

    let response;
    if(id)
    {
      //updating the item
      formData.append("Id",id);       //if update id will be automatically appended
      response=await updateMenuItem({data: formData,id});           //calling update
      toastNotify("Menu Item Updated Successfully","success");
    }
    else{
      //creating item
      response=await createMenuItem(formData);                //calling create api
      toastNotify("Menu Item Created Successfully","success");
    }

    if(response)
    {
      setLoading(false);
      navigate("/menuItem/menuItemList");
    }  


    setLoading(false);
  };
  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <h3 className="offset-2 px-2 text-success">
        {id ? "Edit Menu Item" : "Add Menu Item"}
      </h3>

      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        {/* encType="multipart/form-data" because the request body in backend is of this form we can check */}
        <div className="row mt-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="Name"
              value={menuItemInputs.Name}
              onChange={handleMenuItemInput}
            />
            <textarea
              className="form-control mt-3"
              placeholder="Enter Description"
              name="Description"
              rows={10}
              value={menuItemInputs.Description}
              onChange={handleMenuItemInput}
            ></textarea>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter Special Tag"
              name="SpecialTag"
              value={menuItemInputs.SpecialTag}
              onChange={handleMenuItemInput}
            />
            <select
              className="form-control mt-3 form-select"
              name="Category"
              value={menuItemInputs.Category}
              onChange={handleMenuItemInput}
            >
              {Categories.map((category) => (
                <option value={category}>{category}</option>
              ))}
            </select>
            <input
              type="number"
              className="form-control mt-3"
              required
              placeholder="Enter Price"
              name="Price"
              value={menuItemInputs.Price}
              onChange={handleMenuItemInput}
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="form-control mt-3"
            />
            <div className="row">
              <div className="col-6">
                <button
                  type="submit"
                  className="btn btn-success form-control mt-3"
                >
                  {id ? "Update" : "Create"}
                </button>
              </div>
              <div className="col-6">
                <a
                  onClick={() => navigate("/menuItem/menuitemlist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to Menu Items
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-5 text-center">
            <img
              src={imageToDisplay}
              style={{ width: "100%", borderRadius: "30px" }}
              alt=""
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default MenuItemUpsert;
