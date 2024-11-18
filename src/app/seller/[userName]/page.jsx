"use client";
import { db } from "@/app/config/firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { LucideArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Seller = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const userId = searchParams.get("id");
  const userName = params.userName;
  const router = useRouter();

  useEffect(() => {
    const getAllSellerProducts = async () => {
      try {
        const productRef = collection(db, "Product");

        // Query products created by the specified user ID
        const q = query(productRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        const userProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(userProducts);
      } catch (error) {
        alert(error.message);
      }
    };
    getAllSellerProducts();
  }, []);

  return (
    <section className="px-6 py-4 lg:px-20 lg:py-10">
      <button
        className="mb-4 flex w-fit items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white"
        onClick={() => router.back()}
      >
        <LucideArrowLeft />
        Back
      </button>

      <div className="mt-10 flex items-center gap-6">
        <Image
          className="rounded-full"
          src="/user-dummy.png"
          alt="product image"
          width="150"
          height="150"
        />
        <div className="space-y-1.5">
          <h2 className="text-xl font-semibold lg:text-3xl">
            {userName?.replace("%20", " ")}
          </h2>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold lg:text-3xl">Products</h2>

        <div className="grid gap-5 pt-4 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => {
            return (
              <Link
                key={product?.id}
                href={`/products/${product?.Title.replace(/\s+/g, "-").toLowerCase()}?id=${product?.id}`}
              >
                <div className="overflow-hidden rounded-lg bg-gray-200 shadow-lg">
                  <Image
                    className="object-fill h-72 w-full"
                    src={product?.photoURL[2]}
                    alt="product image"
                    width="350"
                    height="350"
                  />

                  <div className="flex flex-col p-4 pt-5">
                    <h2>{product.Title}</h2>
                    <p className="py-3 text-xl font-semibold">
                      ₦ {Intl.NumberFormat().format(product?.Price)}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Seller;
