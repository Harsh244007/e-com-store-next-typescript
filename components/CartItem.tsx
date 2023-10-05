import React, { useCallback, useState } from "react";
import CartStore from "./CartStore";
import Image from "next/image";
import { fetchDiscount } from "@/utils/fetchDiscount";
import { CartItem, CouponResponse } from "@/utils/Types";
import { observer } from "mobx-react";
import { toJS } from "mobx";

const CartItemComponent: React.FC<{ item: CartItem }> = observer(({ item }) => {
  const [discountCode, setDiscountCode] = useState<string>("");

  const handleApplyDiscount = async () => {
    const response: CouponResponse | boolean | number = await applyCouponCode();
    if (response) {
      CartStore.addDiscountedItems({ id: item.id, discount: response.price });
    } else {
      setDiscountCode("");
    }
  };

  async function applyCouponCode() {
    try {
      const response: CouponResponse | number = await fetchDiscount(discountCode);
      if (response && response !== 404 && response.isValid) {
        alert("Coupon successfully applied");
        return response;
      } else {
        console.error("Invalid coupon code");
        alert("Invalid coupon code");
        return false;
      }
    } catch (error) {
      console.error("Error applying coupon code:", error);
      return false;
    }
  }

  const handleCartRemove = () => {
    CartStore.setCartItems(CartStore.cartItems.filter((cartItem) => cartItem.id !== item.id));
    CartStore.setDiscountedItems(CartStore.discountedItems.filter((discountedItem) => discountedItem.id !== item.id));
  };
  return (
    <li className="flex flex-col md:flex-row items-center gap-4 border-b py-2">
      <div className="flex-shrink-0 w-full md:w-1/3">
        <Image width="200" height="300" src={item.image} alt={item.title} className="w-full h-48 md:h-32 object-cover" />
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-gray-500">{item.description}</p>
        <div className="flex items-center space-x-2">
          <span className="text-green-500">{`$${item.price.toFixed(2)}`}</span>
          <div className="flex items-center space-x-1">
            <span className="text-yellow-500">{item.rating.rate}</span>
            <span className="text-gray-400">({item.rating.count} reviews)</span>
          </div>
        </div>
        {CartStore.discountedItems.find((index) => index.id === item.id) ? (
          <p className="text-lg font-semibold text-green-500">{`Discount of ${CartStore.discountedItems.map((index) =>
            item.id === index.id ? index.discount : ""
          )}% applied`}</p>
        ) : (
          <>
            <div className="flex items-center space-x-2 mt-2">
              <input
                type="text"
                placeholder="Enter discount code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="border p-2 rounded text-black bg-gray-100"
              />
              <button onClick={handleApplyDiscount} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Apply
              </button>
            </div>
          </>
        )}
      </div>
      <button onClick={handleCartRemove} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 mt-4 md:mt-0">
        Remove
      </button>
    </li>
  );
});

export default React.memo(CartItemComponent);
