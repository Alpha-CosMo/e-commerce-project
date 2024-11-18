"use client";
import { useShoppingCart } from "@/app/Context/ShoppingCartContext";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ImageSwiper from "@/components/ImageSwiper";
import { useSearchParams } from "next/navigation";
import { db } from "@/app/config/firebase";
import { getDocs, collection } from "firebase/firestore";

const ProductDetails = () => {
  const [prod, setProd] = useState([]);
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const { add } = useShoppingCart();

  useEffect(() => {
    const getProd = async () => {
      const ref = collection(db, "Product");
      const data = await getDocs(ref);
      const fildata = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProd(fildata);
    };
    getProd();
  });

  let product = prod.find((product) => product.id == productId);

  return (
    <>
      <Header />

      <section className="my-8 px-5 lg:px-20">
        <div className="flex items-start gap-8">
          <ImageSwiper images={product?.photoURL} />

          <div className="flex w-[40%] flex-col gap-2 pt-16">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{product?.Title}</h2>

              <p className="text-xl">
                NGN {Intl.NumberFormat().format(product?.Price)}
              </p>
            </div>

            <button
              type="button"
              className="rounded-lg bg-primary px-4 py-2 text-center font-bold text-white"
              onClick={() => add(product)}
            >
              Add to Cart
            </button>

            <div className="mt-6 space-y-2">
              <h2 className="text-xl font-semibold">Product Description</h2>
              <p>{product?.Description}</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductDetails;
