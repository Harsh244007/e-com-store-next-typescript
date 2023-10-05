import { makeAutoObservable } from "mobx";
import { CartItem, DiscountedItemsTypes, CalculatePriceTypes } from "@/utils/Types";

class CartStore {
  cartItems: CartItem[] | [] = [];
  discountedItems: DiscountedItemsTypes[] | [] = [];
  checkoutItems: CalculatePriceTypes | [] = [];
  constructor() {
    makeAutoObservable(this);
  }
  setCartItems = (data: CartItem[]) => (this.cartItems = data);
  setCheckoutItems = (data: CalculatePriceTypes) => (this.checkoutItems = data);
  setDiscountedItems = (data: DiscountedItemsTypes[]) => (this.discountedItems = data);
  addOneCart = (product: CartItem) => {
    // @ts-ignore
    this.cartItems.push(product);
  };
  addDiscountedItems = (product: DiscountedItemsTypes) => {
    // @ts-ignore
    this.discountedItems.push(product);
  };
}

export default new CartStore();
