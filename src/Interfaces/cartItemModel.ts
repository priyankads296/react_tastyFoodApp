import menuItemModel from "./menuItemModel";

export default interface cartItemModel {
    Id?: number;
    MenuItemId?: number;
    MenuItem?: menuItemModel;
    Quantity?: number;
  }