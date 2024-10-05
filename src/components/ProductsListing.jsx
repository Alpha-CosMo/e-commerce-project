"use client";
import Link from "next/link";
import Image from "next/image";
import data from "/data.json";
import { useShoppingCart } from "@/app/Context/ShoppingCartContext";

// import { useEffect, useState } from "react";
// import axios from "axios";

function ProductsListing() {
  const products = data;

  const { getItemsQty, increaseCartQty, decreaseCartQty, removeFromCart } =
    useShoppingCart();
  // const qty = getItemsQty(id);

  // useEffect(() => {
  //   axios
  //     .get("https://api.escuelajs.co/api/v1/products")
  //     .then((response) => {
  //       setProducts(response.data);
  //     })

  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // function sortArrayById(arr) {
  //   return arr.sort((a, b) => a.id - b.id);
  // }
  // const sortedProducts = sortArrayById(data);
  // console.log(sortedProducts);

  return (
    <div className="grid grid-cols-2 gap-5 px-5 pt-10 lg:grid-cols-4 lg:px-20">
      {products?.map((product, index) => {
        return (
          index < 40 && (
            <div
              key={product?.id}
              className="overflow-hidden rounded-lg bg-gray-200 shadow"
            >
              <Link
                href={`/products/${product?.title.replace(/\s+/g, "-").toLowerCase()}?id=${product?.id}`}
              >
                <Image
                  className="w-full object-cover"
                  src={product.images[0]}
                  alt="product image"
                  width="640"
                  height="640"
                />
              </Link>

              <div className="flex flex-col p-4 pt-5">
                <h2>{product?.title}</h2>
                <p className="py-3 text-xl font-semibold">
                  NGN {Intl.NumberFormat().format(product?.price * 1000)}
                </p>

                <button
                  onClick={() => increaseCartQty(product.id)}
                  className="rounded-lg bg-primary p-4 font-semibold text-white"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          )
        );
      })}
    </div>
  );
}

export default ProductsListing;
