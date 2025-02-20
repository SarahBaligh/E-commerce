import { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Circles } from 'react-loader-spinner';
import { WishlistContext } from '../../Context/WishlistContext';

const Products = () => {

  const {AddToWishlist, wishlist, removeFromWishlist} = useContext(WishlistContext)
  const { addProductToCart } = useContext(CartContext);

  const [loadingStates, setLoadingStates] = useState({});
  const [loader, setLoader] = useState({});

  
  async function AddToCart(id) {
    setLoadingStates(() => ({ [id]: true }));
    const res = await addProductToCart(id);
    if (res.status == "success") {
      toast.success(res.message);
      setLoadingStates(() => ({ [id]: false }));
    } else {
      toast.error("error ya m3lm 3eb");
      setLoadingStates(() => ({ [id]: false }));
    }
  }

  async function toggleWishlist(product) {
    setLoader((prev) => ({ ...prev, [product]: true }));
    const inWishlist = wishlist.find((item) => item._id === product || item.id === product);
    try {
      if (inWishlist) {
        await removeFromWishlist(inWishlist._id);
        toast.success("Product removed from wishlist");
      } else {
        await AddToWishlist(product);
        toast.success("Product added to wishlist");
      }
    } catch (error) {
      toast.error("Error updating wishlist", error);
    }
    setLoader((prev) => ({ ...prev, [product]: false }));
  }

  async function getAllProducts() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { isLoading, data } = useQuery("products", getAllProducts );

  if (isLoading ) {
    return (
      <div className="h-screen bg-opacity-10 bg-black flex flex-wrap justify-center items-center">
        <Circles
          height="80"
          width="80"
          color="#15803d "
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <>
      <div className='py-12 mt-12 md:w-[95%] lg:w-[90%] mx-auto'>
        <div className="flex flex-wrap justify-center items-center">
          {data?.data.data.map(function (product, idx) {
            return (
              <div key={idx} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2 relative group overflow-hidden"> 

                <div className=" p-3 hover:shadow-[0_1px_5px_1px] hover:shadow-green-500 duration-[0.5s]  mb-3 rounded-md">
                  
                  <Link to={`/productDetails/${product.id}`}>

                    <img src={product.imageCover} className="w-full" alt="" />
                    <h3 className="mt-3 text-green-600">{product.category.name}</h3>
                    <h3 className="mt-3">{product.title.split(" ").splice(0, 2).join(" ")}</h3>
                    <div className="mt-3 flex justify-between items-center">

                      <div>
                        <h2>{product.price}</h2>
                      </div>

                      <div>
                        <i className="fa-solid fa-star text-yellow-500"></i>
                        {product.ratingsAverage}
                      </div>

                    </div>

                  </Link>

                  <div className='flex justify-around items-center'>
                    <button onClick={function() {AddToCart(product.id)}} className="mt-3 w-3/4 md:w-3/4 bg-green-600 text-white text-center py-2 rounded-md focus:outline-none absolute bottom-[-100px] -translate-x-3 group-hover:bottom-9 duration-500">
                      {loadingStates[product.id] ? <i className="fa-solid fa-spin fa-spinner text-white"></i> : "Add To Cart"} 
                    </button>

                    <div>
                      {loader[product.id] ? <i className='fa-solid fa-heart text-2xl cursor-pointer p-3 w-1/4 md:w-1/4 text-slate-200 translate-x-[90px]'></i> : <i onClick={() => toggleWishlist(product.id)} className={`fa-solid fa-heart text-2xl cursor-pointer p-3 w-1/4 md:w-1/4 translate-x-[90px]  ${
                        wishlist.find((item) => item._id === product.id) ? "text-red-600" : "text-slate-300" }`}></i> }
                    </div> 

                  </div>

                </div>

              </div>
            );
          })}
        </div>
      </div>
    </>
  )
}


export default Products