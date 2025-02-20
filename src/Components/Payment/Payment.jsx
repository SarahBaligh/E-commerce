import axios from "axios";
import { useContext, useState } from "react";
import { CartContext } from "./../../Context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Payment = () => {

const [phone, setPhone] = useState("")
const [city, setCity] = useState("")
const [details, setDetails] = useState("")

  const navigate = useNavigate()
  const { cartId, setNumOfItems, setProducts, setTotalPrice } =
  useContext(CartContext);

  const [loading, setLoading] = useState(false);
  const [isLoading, setisLoading] = useState(false)

  const x = {
      shippingAddress: {
        details: details,
        phone: phone,
        city: city,
      },
  }

  async function cashPayment() {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        x,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      setNumOfItems(0);
      setProducts([]);
      setTotalPrice(0);

      toast.success(data.status);

      navigate('/')
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  async function onlinePayment() {
    setisLoading(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        x,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
          params:{
            url : "https://e-commerce-green-zeta-11.vercel.app/"
          }
        }
      )
  //     // setPaymentMethod("visa")
      window.open(data.session.url)
  //     console.log(data);
      setNumOfItems(0);
      setProducts([]);
      setTotalPrice(0);

      toast.success(data.status);

  //     // navigate('/')
      setisLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setisLoading(false);
    }
  }

  return (
    <div className="py-12 md:w-[60%] mx-auto mt-12 px-5">
      {/* Details */}
        <div className="relative z-0 w-full mb-7 group">
          <input
            onChange={(e) => setDetails(e.target.value)}
            type="text"
            name="details"
            id="details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Details
          </label>
        </div>

        {/* phone */}
        <div className="relative z-0 w-full mb-7 group">
          <input
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone
          </label>
        </div>

        {/* City */}
        <div className="relative z-0 w-full mb-7 group">
          <input
            onChange={(e) => setCity(e.target.value)}
            type="text"
            name="city"
            id="city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            City
          </label>
        </div>

        <div className="flex flex-col w-full lg:flex-row ">
          <button 
            type="submit"
            onClick={cashPayment}
            className="border-2 border-green-500 text-green-500 py-2 px-5 rounded-md hover:bg-green-500 hover:text-white text-lg font-bold duration-500 my-1 "
          >
            {loading ? (
              <i className="fa-solid fa-spin fa-spinner text-white"></i>
            ) : (
              "Cash Payment"
            )}
          </button>


          <button  
            onClick={onlinePayment}
            type="submit"
            className="border-2 border-green-500 text-green-500 py-2 px-5 rounded-md hover:bg-green-500 hover:text-white text-lg font-bold duration-500 my-1 lg:ms-5 group"
          >
            {isLoading ? (
              <i className="fa-solid fa-spin fa-spinner text-green-500 group-hover:text-white"></i>
            ) : (
              "Online Payment"
            )}
          </button>
        </div>
    </div>
  );
};

export default Payment;
