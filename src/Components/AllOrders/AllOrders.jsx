import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useQuery } from "react-query";
import { Circles } from "react-loader-spinner";

const AllOrders = () => {
  const { id } = jwtDecode(localStorage.getItem("tkn"));

  async function getAllOrders() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
  }

  const { data, isLoading } = useQuery("allorders", getAllOrders);

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
        <div className="p-7 mt-12">
            <div className="mx-auto md:w-[95%] mt-4">
                {data?.data?.map(function(order, idx){return <div key={idx} className="p-6 mb-10 bg-slate-100 ">
                    <h2 className="text-lg font-mono">payment Method Type : {order.paymentMethodType}</h2>
                    <h2 className="text-green-500 my-3 font-mono">Total Price : {order.totalOrderPrice} EGP</h2>

                    <div className="flex flex-wrap items-center border-b border-slate-300 ">
                        {order.cartItems.map(function(item, idx){return <div key={idx} className="flex flex-wrap items-center pb-3 mt-5 w-full md:w-1/3 lg:w-1/4 ">
                        <div className='w-full md:w-1/4 lg:w-1/2 p-2'>
                                <img src={item.product.imageCover} className='w-full' alt="" />
                            </div>
                            {/* content */}
                            <div className='w-full md:w-3/4 lg:w-1/2 p-2'>
                                <h4 className='mb-1 font-mono text-xl md:text-md'>{item.product.title.split(" ").splice(0, 2).join(" ")}</h4>
                                <h5 className='text-green-500'>Price: {item.price} EGP</h5>
                            </div>
                        </div>})}
                    </div>                
                </div>})}
            </div>
        </div>
    </>
)
};

export default AllOrders;
