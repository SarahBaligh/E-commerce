import { useContext, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';
import toast from 'react-hot-toast';
import { Circles } from 'react-loader-spinner';

const WishList = () => {

  const { addProductToCart } = useContext(CartContext);
  const {wishlist, loading, removeFromWishlist} = useContext(WishlistContext)
  const [load, setLoad] = useState({})

  async function AddToCart(id) {
    setLoad(() => ({ [id]: true }));
    const res = await addProductToCart(id);
    if (res.status == "success") {
      toast.success(res.message);
      setLoad(() => ({ [id]: false }));
    } else {
      toast.error("error ya m3lm 3eb");
      setLoad(() => ({ [id]: false }));
    }
  }

  if(loading){
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
      <div className="p-7 mt-12">
        <div className="bg-slate-100 p-5 mx-auto md:w-[95%] mt-4">
          {wishlist?.length == 0 ? <h1 className='text-center text-4xl text-green-700 py-5'>NO DATA TO DISPLAY</h1> : <div>
            <h1 className=" font-bold text-2xl ">WishList❤️</h1>
              {/* map */}
              {wishlist?.map(function(item, idx){return <div key={idx} className='flex flex-wrap items-center pb-3 border-b border-slate-300 mt-5'>
              {/* img */}
              <div className='w-full md:w-1/6 p-4'>
                <img src={item.imageCover} className='w-full' alt="" />
              </div>
              {/* content */}
              <div className='w-full md:w-4/6 p-4'>
                <h4 className='mb-1 font-mono text-xl'>{item.title?.split(" ").splice(0, 2).join(" ")}</h4>
                <h5 className='mb-1 text-green-500 font-semibold'>Price: {item.price} EGP</h5>
                <button onClick={() => {removeFromWishlist(item._id)}} className='flex flex-wrap items-center gap-1 hover:bg-red-500 hover:text-white group p-1 rounded-md duration-500'>
                  <i className="fa-solid fa-trash-can text-red-500 group-hover:text-white duration-500"></i>
                  <h5>Remove</h5>
                </button>
              </div>
                {/* count */}
                <div className='w-full md:w-1/6 p-4'>
                  <div className='flex flex-wrap items-center gap-2'>
                    <button onClick={() => AddToCart(item._id)} className="mt-3 w-[80%] bg-green-600 text-white text-center py-2 rounded-md focus:outline-none">
                      {load[item._id] ? <i className="fa-solid fa-spin fa-spinner text-white"></i> : "Add To Cart"}
                    </button>
                  </div>
                </div>
                        
                </div>
                })}


                </div>
}
        </div>
      </div> 
   </>
  )
}

export default WishList