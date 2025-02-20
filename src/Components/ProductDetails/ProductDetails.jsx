import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import Slider from "react-slick";

function ProductDetails() {

  const { id } = useParams();
  const { addProductToCart } = useContext(CartContext);

  const [loader, setLoader] = useState(false);

  async function addToCart() {
    setLoader(true);   
    const data = await addProductToCart(id);
    if (data.status == "success") {
      toast.success(data.message);
      setLoader(false); 
    } else {
      toast.error("error ya m3lm 3eb");
      setLoader(false);
    }
  }

  const { data, isLoading } = useQuery(`productDetails${id}`, getProductDetails);

  async function getProductDetails() {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };
    

  if (isLoading) {
    return (
      <div className="h-screen bg-green-700 flex flex-wrap justify-center items-center">
        <Circles
          height="80"
          width="80"
          color="#fff"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }


  return (
    <div className="py-12 md:w-[80%] mx-auto">
      <div className="flex flex-wrap justify-center items-center">
        
        <div className="md:w-1/3">
          <div>
            {/* inner div */}
            <Slider {...settings}>
              {data?.data.data.images.map(function(image,idx){ return <div key={idx}>
                    <img
                      src={image}
                      className="w-full p-5"
                      alt=""
                    />
                  </div>
              })}
            </Slider>
          </div>
        </div>

        <div className="md:w-2/3 p-5">
          <div>
            <h1 className="text-3xl font-bold mb-3">{data.data.data.title}</h1>
            <p className="mb-3">{data.data.data.description}</p>
            <h3 className="mb-3">{data.data.data.category.name}</h3>
            <div className="my-3 flex flex-wrap justify-between items-center">
              <div>
                <h2>{data.data.data.price} EGP</h2>
              </div>
              <div>
                <i className="fa-solid fa-star text-yellow-500"></i>
                {data.data.data.ratingsAverage}
              </div>
            </div>
          </div>
          <button
            onClick={addToCart}
            className="w-full bg-green-600 text-white text-center py-2 rounded-md focus:outline-none"
          >
            {loader ? <i className="fa-solid fa-spin fa-spinner text-white"></i> : "Add To Cart"}
            
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
