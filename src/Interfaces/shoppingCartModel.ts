import cartItemModel from "./cartItemModel";

export default interface shoppingCartModel {
    Id?: number;
    UserId?: string;
    CartItems?: cartItemModel[];
    CartTotal?: number;
    StripePaymentIntentId?: any;
    ClientSecret?: any;
  }