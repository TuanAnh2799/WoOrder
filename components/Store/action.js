import { AddToCart, Remove } from "./actionType";

export const AddItemCart =()=> ({
    type: AddToCart,
});

export const RemoveItem =()=> ({
    type: Remove,
});