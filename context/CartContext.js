"use client";
import { notify } from "@/lib/utils";
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  useMemo,
} from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_CART":
        return [...state, action.item];
      case "REMOVE_FROM_CART":
        return state.filter((item) => item.id !== action.itemId);
      case "CHANGE_QUANTITY":
        return state.map((item) =>
          item.id === action.itemId
            ? { ...item, quantity: action.quantity }
            : item
        );
      case "CLEAR_CART":
        return [];
      default:
        return state;
    }
  };

  export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, [], (initial) => {
      const storedCart =
        typeof window !== "undefined" ? localStorage.getItem("userCart") : null;
      return storedCart ? JSON.parse(storedCart) : initial;
    });
  
    const productsTotal = useMemo(() => {
      let totalPrice = cart?.reduce((accumulator, product) => {
        return (
          accumulator +
          parseInt(
            product?.discounted_price ? product?.discounted_price : product.price
          ) *
            product.quantity
        );
      }, 0);
      return totalPrice;
    }, [cart]);
  

    const getItemQuantity = (id) => {
        return cart?.find((item) => item?.id === id)?.quantity || 0;
      };

  useEffect(() => {
    localStorage.setItem("userCart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    console.log(item)
    const {
      productName,
      price,
      id,
      image_url,
      discounted_price,
      selectedVariant,
      size,
      color,
      variations,
      shippingFee,
    } = item;

    if (variations?.length > 0 && !selectedVariant) {
      notify("Select product variant to add to cart", "warning");
      return;
    }

    if(cart?.find((item) => item?.id === id)){
        notify("product already added to cart", "warning");
        return;
    }

    const cartItem = {
      quantity: 1,
      productName,
      price,
      id,
      image_url,
      discounted_price,
      variant_id: selectedVariant,
      size,
      color,
      shippingFee
    };
    console.log("cartitem",cartItem)

    dispatch({ type: "ADD_TO_CART", item: cartItem });
    notify("Item added to cart successfully", "success");
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: "REMOVE_FROM_CART",itemId });
    notify("Item removed from cart", "success");
  };

  const changeQuantity = (itemId, quantity) => {
    dispatch({ type: "CHANGE_QUANTITY", itemId, quantity });
    notify("Item quantity updated", "success");
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        productsTotal,
        getItemQuantity,
        addToCart,
        removeFromCart,
        changeQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {

    const context = useContext(CartContext);

    if (!context) {
      throw new Error("useCart must be used within a CartProvider");
    }
    return context;
  };
