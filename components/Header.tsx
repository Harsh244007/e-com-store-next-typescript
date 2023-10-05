import Link from "next/link";
import CartStore from "./CartStore";
import { observer } from "mobx-react";
import React from "react";

const Header: React.FC = observer(() => {
  return (
    <header className=" text-white m-4 w-50">
      <nav className="flex justify-between items-between gap-10">
        <Link href="/allproducts" className="text-lg font-semibold">
          All Products
        </Link>
        <Link href="/cart" className="text-lg font-semibold">
          Cart {CartStore.cartItems.length >= 1 && CartStore.cartItems.length + " Item Added"}
        </Link>
      </nav>
    </header>
  );
});

export default React.memo(Header);