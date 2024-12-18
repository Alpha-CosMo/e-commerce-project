"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import Link from "next/link";
import { CartItem } from "./CartItem";
import { CreditCard, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { getDocs, collection, query,where } from "firebase/firestore";
import { db } from "@/app/config/firebase";
import { useShoppingCart } from "@/app/Context/ShoppingCartContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/config/firebase";


export default function Drawer({ open, setOpen }) {
  const { cartItems, cart, totalVal } = useShoppingCart();
  // const [cart, setCart] = useState([])

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const currentUserUid = user.uid;
    
        // Filter based on UID 
        const q = query(collection(db, "Cart"), where("uid", "==", currentUserUid));
        getDocs(q)
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // Process the retrieved data
              const userData = ({id:doc.id, ...doc.data()});
              // sets the retrieved data to the cart array
              setCart(userData);
            });
          })
          .catch((error) => {
            console.error("Error getting documents: ", error);
          });
      } else {
        // User is not signed in
        console.log("User is not signed in");
      }
    });
  },)
  

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-[40vw] transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <TransitionChild>
                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <XIcon aria-hidden="true" className="h-6 w-6 text-white" />
                  </button>
                </div>
              </TransitionChild>

              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <DialogTitle className="text-2xl font-semibold leading-6 text-gray-900">
                    Cart
                  </DialogTitle>
                </div>

                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <div className="flex flex-col gap-4">
                    <CartItem />
                  </div>
                  {/* {totalVal !== 0 && ( */}
                    <div className="mt-4 flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">
                        Total:{" "}
                        <span className="ms-auto">
                          NGN {Intl.NumberFormat().format(totalVal)}
                        </span>
                      </h2>

                      <Link href="/checkout">
                        <button
                          type="button"
                          className="rounded-lg bg-primary px-4 py-2 text-center font-bold text-white"
                        >
                          Checkout <CreditCard className="ms-2 inline" />
                        </button>
                      </Link>
                    </div>
                  {/* )} */}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
