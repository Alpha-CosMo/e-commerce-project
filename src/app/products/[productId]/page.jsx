"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useParams } from "next/navigation";

const ProductDetails = () => {
  const params = useParams();
  const productId = params.productId;

  return (
    <>
      <Header />
      <section className="my-6 px-5 lg:px-20">
        <div className="mb-4 h-96 w-full border-2"></div>

        <div className="flex flex-col items-start gap-6 md:flex-row">
          <div className="lg:w-[70%] space-y-6 px-3">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">
                {productId}
              </h2>
              <p className="text-xl">NGN 50,000.00</p>
              <button // onClick={() => addToCart(Products.id)}
                className="rounded-lg bg-sky-600 px-10 py-2 text-[.8rem] text-white lg:text-[1rem]"
              >
                Add to Cart
              </button>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Product Description</h2>
              <p>
                This is the best sneaker you will find in the market right now
                <br /> <br />
                It has the &quot;I am Chosen&quot; grace of speed and will last
                for the rest of ur life
                <br /> <br />
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis, voluptas consequuntur. Architecto reprehenderit vero, iste repudiandae est incidunt mollitia dignissimos eos quod! Hic ullam, impedit molestias quos quibusdam atque possimus!
              </p>
            </div>
          </div>

          <div className="lg:w-[30%] space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="h-16 w-16 rounded-full border-2"></span>
                <span>
                  <p className="text-xl">Seller Name</p>
                  <p className="block text-gray-500">@sellerId</p>
                </span>
              </div>

              <button className="mx-auto block w-[80%] rounded-md bg-sky-600 py-2 text-lg font-semibold text-white">
                Follow
              </button>
            </div>

            <div>
              <div className="msgBox h-20 border"></div>

              <input
                className="mb-2 w-full resize-none rounded-md border p-2"
                name="buyerMessage"
                id="buyerMessage"
                placeholder="Send a message to this seller"
              />
              <button className="mx-auto block w-full rounded-md bg-sky-600 py-2 text-lg font-semibold text-white">
                Send
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductDetails;
