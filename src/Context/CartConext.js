// import axios from 'axios';
// import React, { createContext } from 'react';


//  export  const  cartContext = createContext();

// export default function CartConextProvider({children}) {

//    async function addProductToCart (id){

//     const x = "";
//       await   axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
//             "productId":id
//         },{
//             headers:{token: localStorage.getItem('kay')}
//         }).then((res)=>{
//            console.log(res);
//            const x = res;
                
//         }).catch((err)=>{
//             console.log("err",err);

//         })
//         return x;
//     }


//   return <cartContext.Provider value={{addProductToCart}}>
  
  
//   {children}
  
  
  
//   </cartContext.Provider>
// }
// "https://ecommerce.routemisr.com/api/v1/cart"


import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
// import { authContext } from "./AuthContext";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
//   const token = useContext(authContext);
  const [numOfCartItems, setnumOfCartItems] = useState(0);
  const [totalCartPrice, settotalCartPrice] = useState(0);
  const [allProducts, setallProducts] = useState(null);
  const [cartId, setcartId] = useState(null); 

  // Get user cart when signin
  function getUserCart() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: localStorage.getItem("kay") },
      })
      .then((res) => {
        setcartId(res.data.data._id);
        setallProducts(res.data.data.products);
        setnumOfCartItems(res.data.numOfCartItems);
        settotalCartPrice(res.data.data.totalCartPrice);
        localStorage.setItem('userId', res.data.data.cartOwner);
      })
      .catch((err) => {
        // If cart is empty ... reset all data after payment
        setallProducts([]);
        setnumOfCartItems(0);
        settotalCartPrice(0);
      });
  }

  useEffect(() => {
    getUserCart();
  }, []);

  // Add product to cart then get the cart products
  async function addProductToCart(id) {
    try {
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        {
          headers: { token: localStorage.getItem("kay") },
        }
      );
      getUserCart(); // Refresh cart data
      // setnumOfCartItems(res.data.numOfCartItems);
      // settotalCartPrice(res.data.data.totalCartPrice);
      // setallProducts(res.data.data.products);
      return true;
    } catch (err) {
      return false;
    }
  }

  // Update Cart Items + and  -
  async function updateCount(id, newCount) {
    const booleanFlag = await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count: newCount },
        {
          headers: { token: localStorage.getItem("kay") },
        }
      )
      .then((res) => {
        setnumOfCartItems(res.data.numOfCartItems);
        setallProducts(res.data.data.products);
        settotalCartPrice(res.data.data.totalCartPrice);
        return true;
      })
      .catch((err) => {
        return false;
      });
    return booleanFlag;
  }

  // Remove Cart item
  async function removeCartItem(id) {
    const booleanFlag = await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: { token: localStorage.getItem("kay") },
      })
      .then((res) => {
        setnumOfCartItems(res.data.numOfCartItems);
        setallProducts(res.data.data.products);
        settotalCartPrice(res.data.data.totalCartPrice);
        return true;
      })
      .catch((err) => {
        return false;
      });
    return booleanFlag;
  }

  // Clear Cart items
  async function clearCart() {
    const booleanFlag = await axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: localStorage.getItem("kay") },
      })
      .then((res) => {
        setnumOfCartItems(0);
        setallProducts([]);
        settotalCartPrice(0);
        return true;
      })
      .catch((err) => {
        return false;
      });
    return booleanFlag;
  }

  return (
    <>
      <cartContext.Provider
        value={{
          getUserCart,
          addProductToCart,
          numOfCartItems,
          totalCartPrice,
          allProducts,
          updateCount,
          removeCartItem,
          clearCart,
          cartId,
        }}
      >
        {children}
      </cartContext.Provider>
    </>
  );
}