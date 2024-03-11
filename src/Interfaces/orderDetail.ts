import menuItemModel from "./menuItemModel";

export interface orderDetail {
    OrderDetailId?: number;
    OrderHeaderId?: number;
    MenuItemId?: number;
    MenuItem?: menuItemModel;
    Quantity?: number;
    ItemName?: string;
    Price?: number;
  }