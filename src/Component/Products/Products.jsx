import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useQuery } from "react-query";
import SimpleSlider from "../HomeSlider/HomeSlider";

import CategorySlider from "../categorySlider/categorySlider";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartConext";
import { toast } from "react-hot-toast";

export default function Products() {
  // const [allProducts, setallProducts] = useState(null);
  const {addProductToCart} =useContext(cartContext);
  async function addProduct(id){

    const res= await addProductToCart(id);
    console.log("res:"+res)
//  if (res){
 
 
 
//     console.log('epset ya m3lem'); }
  
//    }
if (res) {
  toast.success("Product Adeed Successfully", {
    duration: 1500,
    position: "top-right",
    style: { background: "#177448", color: "white" },
  });
} else {
  toast.error("Error Occurred", {
    duration: 1500,
    position: "top-right",
    style: { background: "#F8D7DA", color: "#58151C" },
  });

}}

  async function getProducts() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");

    // axios.get("https://ecommerce.routemisr.com/api/v1/products")
    //   .then((res) => {
    //     setallProducts(res.data.data);
    //   }, [])
    //   .catch((err) => {
    //     console.log("err", err);
    //   }, []);
  }

  const { isLoading, data } = useQuery("getProducts", getProducts);
  // useEffect(() => {
  //   getProducts();
  // }, []);

  console.log(isLoading);
  console.log(data?.data.data);

  if (isLoading) {
    return (
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
    );
  }

  return (
    <>
      <div className=" pt-3 container">
        <div className="row my-4">
          <div className="col-md-10">
            <SimpleSlider />
          </div>
          <div className="col-md-2">
          <div>
            <img
              style={{ height: "150px" }}
              className="w-100"
              src={require("../../images/blog-img-1.jpeg")}
              alt=""
            />
          </div>
          <div>
            <img
              style={{ height: "150px" }}
              className="w-100"
              src={require("../../images/blog-img-2.jpeg")}
              alt=""
            />
          </div>
        </div>

        
        </div>
    <CategorySlider/>
        
        <div className=" products row g-3 mt-3 ">
          {data.data.data.map((product, index) => (
            <div key={index} className="col-md-2 overflow-hidden">
             <Link className="product " to={`/ProductDetals/${product.id}`}>
             <div >
                <img src={product.imageCover} className="w-100" alt="yyy" />
                <h4 className="h6 text-main">{product.category.name}</h4>
                <h2 className="h6 text-center">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h2>
                <div className=" d-flex  justify-content-between">
                  {product.priceAfterDiscount ? (
                    <p>
                      <span className=" text-decoration-line-through">
                        {product.price}
                      </span>{" "}
                      - {product.priceAfterDiscount}
                    </p>
                  ) : (
                    <p>{product.price}</p>
                  )}

                  <p>
                    <span>
                      <i
                        style={{ color: " yellow" }}
                        className="fa-solid fa-star"
                      ></i>
                    </span>{" "}
                    {product.ratingsAverage}
                  </p>
                </div>
              </div>
             </Link>
              <button onClick={()=>addProduct(product.id)} className="addbtn btn bg-main text-white m-auto d-block">+</button>
            </div>
          ))}
        </div>
      </div>

      {/* {allProducts ? (
        <div className=" container">
          <div className="row g-3">
            {allProducts.map((product, index) => (
              <div key={index} className="col-md-2">
                <div className="product ">
                  <img src={product.imageCover} className="w-100" alt="yyy" />
                  <h4 className="h6 text-main">{product.category.name}</h4>
                  <h2 className="h6 text-center">{product.title.split(' ').slice(0,2).join(' ')}</h2>
                  <div className=" d-flex  justify-content-between">

                    {product.priceAfterDiscount?<p><span className=" text-decoration-line-through">{product.price}</span> - {product.priceAfterDiscount}</p>:<p>{product.price}</p>}
                    
                    
                  <p><span><i style={{color:" yellow"}} className="fa-solid fa-star"></i></span> {product.ratingsAverage}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
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
      )} */}
    </>
  );
}
