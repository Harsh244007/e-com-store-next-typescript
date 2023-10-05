import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { fetchProducts } from "@/utils/fetchAllProducts";
import Image from "next/image";
import CartStore from "./CartStore";
import { observer } from "mobx-react";
import { CartItem } from "@/utils/Types";

const ProductList: React.FC = observer(() => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<CartItem[]>([]);
  
  useEffect(() => {
    const fetchProductData = async () => {
      const data = await fetchProducts(currentPage);
      setProducts(data);
    };

    fetchProductData();
  }, [currentPage]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(20 / itemsPerPage);

  const handleUpdatePage = (nextPage: number) => {
    setCurrentPage(nextPage);
  };
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Product List</h2>
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product.id} className="border p-4 flex flex-wrap justify-center items-center space-x-4">
            <div className="flex-shrink-0">
              <Image width="200" height="300" src={product.image} alt={product.title} className="w-32 h-32 object-cover" />
            </div>
            <div className="flex-grow max-w-3xl flex-wrap">
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-500">{product.description}</p>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">{`$${product.price.toFixed(2)}`}</span>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-500">{product.rating.rate}</span>
                  <span className="text-gray-400">({product.rating.count} reviews)</span>
                </div>
              </div>
              {CartStore.cartItems.find((item) => item.id === product.id) ? (
                <button
                  onClick={() => CartStore.setCartItems(CartStore.cartItems.filter((item) => item.id !== product.id))}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              ) : (
                <button onClick={() => CartStore.addOneCart(product)} className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                  Add to Cart
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handleUpdatePage} />
    </div>
  );
});

export default ProductList;
