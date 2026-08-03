export interface OrderItemDTO{

    productId:number;

    quantity:number;

}

export interface CreateOrderDTO{

    customerName:string;

    customerEmail:string;

    customerPhone:string;

    address:string;

    paymentMethod:"COD"|"ONLINE";

    items:OrderItemDTO[];

}