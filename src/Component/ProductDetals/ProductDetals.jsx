import axios from 'axios'
import React, { useContext } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { cartContext } from '../../Context/CartConext';
import { toast } from 'react-hot-toast';

export default function ProductDetals() {

 const {addProductToCart}= useContext(cartContext);
  const {id}=useParams();

  async function addProduct(id){

   const res= await addProductToCart(id);
   console.log("res:"+res)
// if (res){



//    console.log('epset ya m3lem'); }
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
 
  }

}



function getProductDeta(){



      return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)



}

     const {data,isLoading} = useQuery(`ProductDetals-${id}`,getProductDeta);


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



  return <>
  
  <div className="container">
    <div className="row align-items-center">
      <div className="col-md-3">
    <figure>

      <img className='w-100' src={data.data.data.imageCover} alt="" />
    </figure>


      </div>
      <div className="col-md-9">


        <article>
          <h3>{data.data.data.title}</h3>
          <p>{data.data.data.description}</p>
        </article>
        <button onClick={()=>addProduct(data.data.data.id)} className='btn w-100 bg-main text-white '>Add to card</button>
        <p>id:  {data?.data.data.id}</p>
      </div>
    </div>

    
  </div>
  
  
  
  </>
}
