// import axios from "axios";
// import { Circles } from "react-loader-spinner";
// import { useQuery } from "react-query";
import HomeSlider from "../HomeSlider/HomeSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
// import { useContext, useState } from "react";
// import { CartContext } from "../../Context/CartContext";
import Products from "../Products/Products";
function Home() {

  // const { addProductToCart } = useContext(CartContext);

  // const [loadingStates, setLoadingStates] = useState({});


//   async function getAllProducts() {
//     return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
// }

//   const { isLoading} = useQuery("products", getAllProducts ); 

  // if (isLoading) {
  //   return (
  //     <div className="h-screen bg-green-700 flex flex-wrap justify-center items-center">
  //       <Circles
  //         height="80"
  //         width="80"
  //         color="#fff"
  //         ariaLabel="circles-loading"
  //         wrapperStyle={{}}
  //         wrapperClass=""
  //         visible={true}
  //       />
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="py-7 md:w-[95%] lg:w-[90%] mx-auto">
        <HomeSlider />
        <CategorySlider />
      </div>
      <Products/> 
    </>
  );
}

export default Home;
