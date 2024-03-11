import { orderHeader } from "../../../Interfaces";

export default interface OrderListProps{
    isLoading:boolean;
    orderData:orderHeader[];
}