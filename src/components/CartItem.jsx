"use client"
import Image from "next/image";
import data from "/data.json";
import { useShoppingCart } from "@/app/Context/ShoppingCartContext";
import { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "@/app/config/firebase";
import { auth } from "@/app/config/firebase";
import { Minus, Plus } from "lucide-react";

export function CartItem({ id, quantity}) {
  const { inc, dec, del, cartItems } =
    useShoppingCart();

  // let item = data?.find((product) => product.id == id);
  // if (item == null) return null;
    // const getProd = async() => {
    //   const ref = collection(db,"Cart")
    //   const data = await getDocs(ref)
    //   const Prod = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
    //   console.log(Prod)
    //   setCart(Prod)
    // }
    // getProd()

    // useEffect(()=>{
    //   onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //       const currentUserUid = user.uid;
      
    //       // Filter based on UID 
    //       const q = query(collection(db, "Cart"), where("uid", "==", currentUserUid));
    //       getDocs(q)
    //         .then((querySnapshot) => {
    //           querySnapshot.forEach((doc) => {
    //             // Process the retrieved data
    //             const userData = ({id:doc.id, ...doc.data()});
    //             // sets the retrieved data to the cart array
    //             setCart(userData);
    //           });
    //         })
    //         .catch((error) => {
    //           console.error("Error getting documents: ", error);
    //         });
    //     } else {
    //       // User is not signed in
    //       console.log("User is not signed in");
    //     }
    //   });
  
    // },)


  return (
    <>
          {
            cartItems.map((item) =>{
              return(
                <div key={item.id} className="border-b-2 py-4">
            <div className="mb-6 flex items-center gap-4">
              <Image
                className="rounded-md"
                src={item.photoURL[2]}
                alt="item image"
                width={125}
                height={75}
              />
      
              <div>
                <h2 className="text-xl font-semibold">{item.Title}</h2>
                <p className="mt-2 text-xl">
                  NGN {Intl.NumberFormat().format(item?.Price)}
                </p>
              </div>
            </div>
      
            <div className="flex items-center justify-between">
              <button
                className="rounded-md bg-red-500 px-4 py-1.5 text-white"
                onClick={() => del(item.id)}
              >
                Remove
              </button>
      
              <div className="flex items-center gap-3">
                <button
                  className="flex items-center justify-center rounded-md bg-neutral-500 p-3 text-white"
                  onClick={() => dec(item)}
                >
                  <Minus className="size-3 font-semibold" />
                </button>
      
                <p className="text-base">{item?.qty}</p>
      
                <button
                  className="flex items-center justify-center rounded-md bg-neutral-500 p-3 text-white"
                  onClick={() => inc(item)}
                >
                  <Plus className="size-3 font-semibold" />
                </button>
              </div>
            </div>
          </div>
              )
            })
          }
          
    </>
  );
}
