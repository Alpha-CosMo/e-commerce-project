"use client";
import { useEffect, useState } from "react";
import Header from "./Header";
import ProductsListing from "./ProductsListing";
import { useShoppingCart } from "@/app/Context/ShoppingCartContext";
import { db } from "@/app/config/firebase";
import { getDocs, collection } from "firebase/firestore";

const Wrapper = () => {
  const { add, searchParams, setSearchParams } = useShoppingCart();
  const [sortedProducts, setSortedProducts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const ref = collection(db, "Product");
      const data = await getDocs(ref);

      const fildata = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(fildata);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filteredItems = products?.filter((item) => {
      return searchParams.toLowerCase() === ""
        ? "value is empty"
        : item.Title.toLowerCase().includes(searchParams.toLowerCase().trim());
    });
    setSortedProducts(filteredItems);
  }, [searchParams, products]);

  return (
    <>
      <Header searchParams={searchParams} setSearchParams={setSearchParams} />
      <ProductsListing sortedProducts={sortedProducts} add={add} />
    </>
  );
};
export default Wrapper;
