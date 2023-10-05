import { observer } from "mobx-react";
import React, { useState } from "react";
import CartStore from "./CartStore";
import Image from "next/image";

const Checkout: React.FC = observer(() => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl text-center font-semibold mb-4">Order Placed Successfully for below items.</h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Cart Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CartStore.cartItems.map((item) => {
            return (
              <div key={item.id} className="bg-stone-900 border border-white p-4 rounded shadow">
                <Image width="200" height="300" src={item.image} alt={item.title} className="w-full h-32 object-cover" />
                <h4 className="text-lg font-semibold mt-2">{item.title}</h4>
                <p className="text-gray-100">{`Price: $${item.price.toFixed(2)}`}</p>
              </div>
            );
          })}
        </div>
      </div>
      {CartStore.discountedItems.length > 0 ? (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Discounted Items</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CartStore.discountedItems.map((discountedItem) => {
              const cartItem = CartStore.cartItems.find((item) => item.id === discountedItem.id);
              const discountedPrice = cartItem ? cartItem.price - (cartItem.price * discountedItem.discount) / 100 : 0;
              if (cartItem) {
                return (
                  <div key={discountedItem.id} className="bg-stone-900 border border-white p-4 rounded shadow">
                    <Image width={200} height={300} src={cartItem?.image} alt={cartItem?.title} className="w-full h-32 object-cover" />
                    <h4 className="text-lg font-semibold mt-2">{cartItem?.title}</h4>
                    <p className="text-gray-100 line-through">{`Price: $${cartItem.price.toFixed(2)}`}</p>
                    <p className="text-gray-100">{`Discounted Price: $${discountedPrice.toFixed(2)}`}</p>
                  </div>
                );
              }
              return "";
            })}
          </div>
        </div>
      ) : (
        ""
      )}
      <div>
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        <div className="bg-stone-900 border border-white p-4 rounded shadow">
          {CartStore.discountedItems.length > 0 ? (
            <>
            {/* @ts-ignore */}
              <p className="text-lg font-semibold line-through">{`Total Price: $${CartStore.checkoutItems.totalPrice.toFixed(2)}`}</p>
              <p className="text-lg font-semibold">{`Total Items: ${CartStore.cartItems.length}`}</p>
            {/* @ts-ignore */}

              <p className="text-lg font-semibold">{`Total Discount: $${CartStore.checkoutItems.totalDiscount.toFixed(2)}`}</p>
              <p className="text-lg font-semibold">{`Total Discount Items: ${CartStore.discountedItems.length}`}</p>
            {/* @ts-ignore */}
              <p className="text-lg font-semibold">{`Updated Final Price: $${CartStore.checkoutItems.updatedFinalPrice.toFixed(2)}`}</p>
            </>
          ) : (
            <>
            {/* @ts-ignore */}
            <p className="text-lg font-semibold">{`Total Price: $${CartStore.checkoutItems.totalPrice.toFixed(2)}`}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default Checkout;
