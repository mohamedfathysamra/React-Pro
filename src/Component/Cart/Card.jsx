// import React from 'react'

// export default function Card() {
//   return (
//     <div>Cart</div>
//   )
// }



import React, { useContext } from "react";


import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { cartContext } from "../../Context/CartConext";

export default function Cart() {
  const {
    totalCartPrice,
    allProducts,
    updateCount,
    removeCartItem,
    clearCart,
  } = useContext(cartContext);
  const navigate = useNavigate();

  async function updateProductCount(id, newCount) {
    if (newCount <= 0) {
      newCount = 0;
    }
    const res = await updateCount(id, newCount);
    if (res) {
      toast.success("Product Updated Successfully", {
        duration: 1500,
        position: "top-center",
        style: { background: "#177448", color: "white" },
      });
    } else {
      toast.error("Error Occurred", {
        duration: 1500,
        position: "top-center",
        style: { background: "#F8D7DA", color: "#58151C" },
      });
    }
  }

  async function removeItem(id) {
    const res = await removeCartItem(id);
    if (res) {
      toast.success("Product Removed Successfully", {
        duration: 1500,
        position: "top-center",
        style: { background: "#F8D7DA", color: "#58151C" },
      });
    }
  }
  async function clearCartItems() {
    const res = await clearCart();
    if (res) {
      toast.success("Cart Cleared Successfully", {
        duration: 1500,
        position: "top-center",
        style: { background: "#F8D7DA", color: "#58151C" },
      });
    }
  }

  function navigateToHome() {
    navigate("/");
  }

  if (!allProducts) {
    return <>
     <div className="d-flex vh-100 bg-primary bg-opacity-50 justify-content-center align-items-center">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    
    </>;
  }

  return (
    <>
      {allProducts.length ? (
        <div className="py-5">
          <div className="container py-5 my-5  rounded-4">
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              <div>
                <h2>Shop Cart : </h2>
                <h5 className="text-success mb-4">
                  Total cart price : {totalCartPrice} LE
                </h5>
              </div>
              <Link to={"/Payment"}>
                <button className="btn btn-success">Confirm Payment</button>
              </Link>
            </div>
            {allProducts.map((product, idx) => {
              return (
                <div
                  key={idx}
                  className="row py-2 mt-2 px-3 align-items-center rounded-3 shadow cart-product gy-3"
                >
                  <div className="col-md-2">
                    <Link to={`/Productdetails/${product.product.id}`}>
                      <figure className="rounded-3 overflow-hidden">
                        <img
                          src={product.product.imageCover}
                          alt={product.product.title}
                          className="w-100"
                        />
                      </figure>
                    </Link>
                  </div>
                  <div className="col-md-8">
                    <article className="">
                      <Link to={`/Productdetails/${product.product.id}`}>
                        <h3 className="h4 text-success">
                          {product.product.title}
                        </h3>
                      </Link>
                      <h5 className="h6">Price :{product.price} LE</h5>
                      <button
                        className="btn p-1 btn-danger"
                        onClick={() => {
                          removeItem(product.product.id);
                        }}
                      >
                        <i className="fa-solid fa-trash-can me-1"></i>Remove
                      </button>
                    </article>
                  </div>
                  <div className="col-md-2">
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <button
                        className="btn btn-outline-success py-1"
                        onClick={() => {
                          updateProductCount(
                            product.product.id,
                            product.count + 1,
                            "added"
                          );
                        }}
                      >
                        +
                      </button>
                      <p className="m-0">{product.count}</p>
                      <button
                        className="btn btn-outline-success py-1"
                        disabled={product.count === 1}
                        onClick={() => {
                          updateProductCount(
                            product.product.id,
                            product.count - 1
                          );
                        }}
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            <button
              className="btn btn-danger mt-4 m-auto d-block px-5"
              onClick={clearCartItems}
            >
              Clear Cart
            </button>
          </div>
        </div>
      ) : (
        <div className="container py-5 my-5 text-center">
          <div className=" py-5 my-5">
            <h1 className="pt-5 mt-5">Cart Empty</h1>
            <button
              className="btn btn-success mt-3 py-3"
              onClick={navigateToHome}
            >
              Pess Here To Add Products
              <i className="fa-solid fa-cart-plus ms-2"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}