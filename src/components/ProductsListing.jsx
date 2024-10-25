"use client";
import Link from "next/link";
import Image from "next/image";
import data from "/data.json";
import { db } from "@/app/config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useShoppingCart } from "@/app/Context/ShoppingCartContext";
import { useEffect, useState } from "react";

function ProductsListing() {
  const products = data;
  const [sortedProducts, setSortedProducts] = useState([]);
  const [prod, setProd] = useState([])
  const { add, searchParams } = useShoppingCart();

  useEffect(() => {
    const filteredItems = prod.filter((item) => {
      return searchParams.toLowerCase() === ""
        ? "Not Found"
        : item.Title.toLowerCase().includes(searchParams.toLowerCase().trim());
    });
    setSortedProducts(filteredItems);
  }, [searchParams, prod]);

  const getProd = async() =>{
    const ref = collection(db, "Product")
    const data = await getDocs(ref)
    const fildata = data.docs.map((doc) => ({...doc.data(), id:doc.id}))
    setProd(fildata)
  }
  getProd()

  return (
    <div className="grid grid-cols-2 gap-5 px-5 pt-10 lg:grid-cols-4 lg:px-20">
      {sortedProducts?.map((product, index) => {
        return (
          index > 1 && (
            <div
              key={product?.id}
              className="overflow-hidden rounded-lg bg-gray-200 shadow"
            >
              <Link
                href={`/products/${product?.Title.replace(/\s+/g, "-").toLowerCase()}?id=${product?.id}`}
              >
                <img
                  className="w-full object-cover"
                  src={product.photoURL[2]}
                  alt="product image"
                  width="640"
                  height="640"
                />
              </Link>

              <div className="flex flex-col p-4 pt-5">
                <h2>{product?.Title}</h2>
                <p className="py-3 text-xl font-semibold">
                  NGN {Intl.NumberFormat().format(product?.Price)}
                </p>

                <button
                  onClick={() => add(product)}
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
