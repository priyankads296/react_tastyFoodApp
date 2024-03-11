import { SD_Status } from "../Utility/SD";
import { orderDetail } from "./orderDetail";

  
  export interface orderHeader {
    OrderHeaderId?: number;
    PickupName?: string;
    PickupPhoneNumber?: string;
    PickupEmail?: string;
    ApplicationUserId?: string;
    User?: any;
    OrderTotal?: number;
    OrderDate?: string;
    StripePaymentIntentID?: string;
    Status?: SD_Status;
    TotalItems?: number;
    OrderDetails: orderDetail[];
  }