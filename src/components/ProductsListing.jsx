"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductsListing() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((response) => {
        // console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="grid grid-cols-2 gap-5 px-5 pt-10 lg:grid-cols-4 lg:px-20">
      {products?.map((product, index) => {
        return (
          index < 12 &&
          <Link href={`/products/${product?.title.replace(/\s+/g, '-').toLowerCase()}`} key={product?.id}>
            <div className="overflow-hidden rounded-lg bg-gray-200 shadow">
              <Image
                className="h-40 w-full object-cover lg:h-60"
                src={product?.image}
                alt="product image"
                width="640"
                height="640"
              />
              <div className="flex flex-col pt-5 p-4">
                <h2>
                  {product?.title}
                </h2>
                <p className="font-semibold text-xl py-3">
                  NGN {Intl.NumberFormat().format(product?.price * 1000)}
                </p>

                <button className='bg-primary text-white font-semibold p-4 rounded-lg'>Add to Cart</button>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default ProductsListing;
