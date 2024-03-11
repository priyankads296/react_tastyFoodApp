import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetMenuItemByIdQuery,
  useGetMenuItemsQuery,
} from "../../../Apis/menuItemApi";
import { menuItemModel } from "../../../Interfaces";
import { setMenuItem } from "../../../Storage/Redux/menuItemSlice";
import { MainLoader } from "../Common";
import MenuItemCard from "./MenuItemCard";
import { RootState } from "../../../Storage/Redux/store";
import { SD_SortTypes } from "../../../Utility/SD";

function MenuItemList() {
  const dispatch = useDispatch();
  const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);
  const { data, isLoading } = useGetMenuItemsQuery(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryList, setCategoryList] = useState([""]);
  const [sortName, setSortName] = useState(SD_SortTypes.NAME_A_Z);
  const sortOptions: Array<SD_SortTypes> = [
    SD_SortTypes.PRICE_LOW_HIGH,
    SD_SortTypes.PRICE_HIGH_LOW,
    SD_SortTypes.NAME_A_Z,
    SD_SortTypes.NAME_Z_A,
  ];
  const searchValue = useSelector(
    (state: RootState) => state.menuItemStore.search
  );

  const handleCategoryClick = (i: number) => {
    const buttons = document.querySelectorAll(".custom-buttons");
    let localCategory;
    buttons.forEach((button, index) => {
      if (index == i) {
        button.classList.add("active");
        if (index == 0) {
          localCategory = "All";
        } else {
          localCategory = categoryList[index];
        }
        setSelectedCategory(localCategory);
        const tempArray = handleFilters(sortName,localCategory, searchValue);
        setMenuItems(tempArray);
      } else {
        //remove active class from current
        button.classList.remove("active");
      }
    });
  };

  const handleSortClick=(i:number)=>{
    setSortName(sortOptions[i]);
    const tempArray=handleFilters(sortOptions[i],selectedCategory,searchValue);
    setMenuItems(tempArray);
  }

  const handleFilters = (sortType: SD_SortTypes,category: string, search: string) => {
    let tempArray =
      category === "All"
        ? [...data.Result]
        : data.Result.filter(
            (item: menuItemModel) =>
              item.Category.toUpperCase() === category.toUpperCase()
          );

    //search functionanlity
    if (search) {
      const tempSearchMenuItems = [...tempArray];
      // console.log(tempSearchMenuItems);
      tempArray = tempSearchMenuItems.filter((item: menuItemModel) =>
        item.Name.toUpperCase().includes(search.toUpperCase())
      );
     
    }

  //sort
  if (sortType === SD_SortTypes.PRICE_LOW_HIGH) {
    tempArray.sort((a: menuItemModel, b: menuItemModel) => a.Price - b.Price);
    }
    
    if (sortType === SD_SortTypes.PRICE_HIGH_LOW) {
      tempArray.sort((a: menuItemModel, b: menuItemModel) => b.Price - a.Price);
    }
    if (sortType === SD_SortTypes.NAME_A_Z) {
      tempArray.sort(
        (a: menuItemModel, b: menuItemModel) =>
          a.Name.toUpperCase().charCodeAt(0) -
          b.Name.toUpperCase().charCodeAt(0)
      );
    }
    if (sortType === SD_SortTypes.NAME_Z_A) {
      tempArray.sort(
        (a: menuItemModel, b: menuItemModel) =>
          b.Name.toUpperCase().charCodeAt(0) -
          a.Name.toUpperCase().charCodeAt(0)
      );
    }

    return tempArray;

  };

  useEffect(() => {
    if (data && data.Result) {
      const tempMenuArray = handleFilters(sortName,selectedCategory, searchValue);
      setMenuItems(tempMenuArray);
    }
  }, [searchValue]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setMenuItem(data.Result));
      setMenuItems(data.Result);

      const tempCategoryList = ["All"];
      data.Result.forEach((item: menuItemModel) => {
        if (tempCategoryList.indexOf(item.Category) == -1) {
          tempCategoryList.push(item.Category);
        }
      });

      setCategoryList(tempCategoryList);
    }
  }, [isLoading]);

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="container row">
      <div className="my-3">
        <ul className="nav w-100 d-flex justify-content-center ">
          {categoryList.map((categoryName, index) => (
            
            <li className="nav-item " 
              style={{...(index===0 && {marginLeft:"auto"})}} key={index}>
              <button
                className={`nav-link p-0 pb-2 custom-buttons ${
                  index === 0 && "active"
                }`}
                onClick={() => handleCategoryClick(index)}
              >
                {categoryName}
              </button>
            </li>
          ))}
          <li className="nav-item dropdown custom-buttons" style={{marginLeft:"auto"}}>
            <div
              className="nav-link dropdown-toggle text-dark border"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {sortName}
            </div>
            <ul className="dropdown-menu">
              {sortOptions.map((sortType, index) => (
                <li
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleSortClick(index)}
                >
                  {sortType}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      {menuItems.length > 0 &&
        menuItems.map((menuItem: menuItemModel, index: number) => (
          <MenuItemCard menuItem={menuItem} key={index} />
        ))}
    </div>
  );
}

export default MenuItemList;
