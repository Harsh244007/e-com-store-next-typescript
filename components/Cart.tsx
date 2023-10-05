import React, { useMemo, useEffect,useCallback } from "react";
import CartStore from "./CartStore";
import { observer } from "mobx-react";
import CartItemComponent from "./CartItem";
import { CalculatePriceTypes } from "@/utils/Types";
import { useRouter } from "next/router";

const Cart: React.FC = observer(() => {

  const router = useRouter();

  useEffect(() => {
    calculateTotalPrice();
  }, [CartStore.discountedItems]);

  const calculateTotalPrice = useMemo(() => {
    return () => {
      const totalPrice: number = CartStore.cartItems.reduce((total, item) => total + item.price, 0);
      const totalItems: number = CartStore.cartItems.length;
      let totalDiscount: number = 0;
      let totalDiscountItems: number = 0;

      CartStore.discountedItems.forEach((discountedItem) => {
        const item = CartStore.cartItems.find((cartItem) => cartItem.id === discountedItem.id);
        if (item) {
          const itemDiscountAmount: number = Number(discountedItem.discount * item.price) / 100;
          totalDiscount += itemDiscountAmount;
          totalDiscountItems++;
        }
      });

      const updatedFinalPrice: number = totalPrice - totalDiscount;

      return {
        totalPrice: Number(totalPrice.toFixed(2)),
        totalItems,
        totalDiscount: Number(totalDiscount.toFixed(2)),
        totalDiscountItems,
        updatedFinalPrice: Number(updatedFinalPrice.toFixed(2)),
      };
    };
  }, [CartStore.cartItems, CartStore.discountedItems]);

  const {
    totalPrice,
    totalItems,
    totalDiscount,
    totalDiscountItems,
    updatedFinalPrice,
  }: CalculatePriceTypes = calculateTotalPrice();

  const handleCheckOut = useCallback(() => {
    CartStore.setCheckoutItems({
      totalPrice,
      totalItems,
      totalDiscount,
      totalDiscountItems,
      updatedFinalPrice,
    });

    router.push("/checkout");
  }, [totalPrice, totalItems, totalDiscount, totalDiscountItems, updatedFinalPrice]);


  return (
    <>
      {CartStore.cartItems.length !== 0 ? (
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-semibold mb-4">Cart</h2>
          <ul className="space-y-4">
            {CartStore.cartItems.map((item) => (
              <CartItemComponent key={item.id} item={item} />
            ))}
          </ul>
          <div className="mt-4 gap-4">
            {CartStore.discountedItems.length !== 0 && totalDiscount > 0 ? (
              <div className="my-4 gap-4">
                <p className="text-lg font-semibold line-through">Total Price: ${totalPrice}</p>
                <p className="text-lg font-semibold">Total Items: {totalItems}</p>
                <p className="text-lg font-semibold">Total Discount: ${totalDiscount}</p>
                <p className="text-lg font-semibold">Total Discount Items: {totalDiscountItems}</p>
                <p className="text-lg font-semibold">Updated Final Price: ${updatedFinalPrice}</p>
              </div>
            ) : (
              <p className="text-lg font-semibold">Total Price: ${totalPrice}</p>
            )}
            <button className={` text-white px-4 py-2 rounded bg-blue-500 hover:bg-blue-600`} onClick={handleCheckOut}>
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <p>Cart is empty. Please add some products.</p>
      )}
    </>
  );
});

export default React.memo(Cart);
