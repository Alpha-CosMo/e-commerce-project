"use client";
import { createContext, useContext, useReducer } from "react";

// const Context = createContext();

// const CartContext = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   return <Context.Provider value={{ cart, setCartItems }}>{children}</Context.Provider>;
// };

// export default CartContext;



const CartContext = createContext();

const initialState = {
  cart: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item,
          ),
        };
      } else {
        return {
          ...state,
          cart: [
            ...state.cart,
            { ...action.payload, quantity: action.payload.quantity },
          ],
        };
      }
    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case "INCREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.amount }
            : item,
        ),
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity: Math.max(item.quantity - action.payload.amount, 0),
                }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
