import { shoppingCartModel } from "../../../Interfaces";
import { SD_Status } from "../../../Utility/SD";

export interface OrderSummaryProps {
  data: {
    Id?: number;
    CartItems?: shoppingCartModel[];
    CartTotal?: number;
    UserId?: string;
    StripePaymentIntentId?: string;
    Status?: SD_Status;
  };
  userInput: {
    name: string;
    email: string;
    phoneNumber: string;
  };
}