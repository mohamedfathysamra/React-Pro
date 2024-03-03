import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategorySlider() {




    function getCategores(){

     return   axios.get("https://ecommerce.routemisr.com/api/v1/categories");



    }
    const  {data ,isLoading} =  useQuery('GetCategores',getCategores);
   
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


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
        {data.data.data.map((categ,idx) =>  <div key={idx}>

            <img style={{height:"200px"}} className=" w-100 " src={categ.image} alt="" />






        </div>







        )}
    </Slider>
  );
}
