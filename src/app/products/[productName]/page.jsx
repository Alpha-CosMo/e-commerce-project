"use client";
import data from "/data.json";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ImageSwiper from "@/components/ImageSwiper";
import { useParams, useSearchParams } from "next/navigation";

const ProductDetails = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  const productTitle = params.productName;
  const productId = searchParams.get("id");

  let product = data.find((product) => product.id == productId);

  return (
    <>
      <Header />

      <section className="my-8 px-5 lg:px-20">
        <div className="grid grid-cols-2 items-center gap-8">
          <ImageSwiper images={product?.images} />

          <div className="flex flex-col gap-2">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{product?.title}</h2>

              <p className="text-xl">
                NGN {Intl.NumberFormat().format(product?.price * 1000)}
              </p>
            </div>

            <button className="rounded-lg bg-primary px-4 py-2 text-center font-bold text-white">
              Buy It Now
            </button>

            <button className="rounded-lg border-2 border-primary bg-transparent px-4 py-2 text-center font-bold text-primary">
              Add to Cart
            </button>

            <button className="rounded-lg border-2 border-primary bg-transparent px-4 py-2 text-center font-bold text-primary">
              Add to wishlist
            </button>
          </div>
        </div>

        <div className="mt-6 w-1/2">
          <h2 className="text-xl font-semibold">Product Description</h2>
          <p>{product?.description}</p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductDetails;
