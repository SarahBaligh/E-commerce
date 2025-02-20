import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";

const ForgetPassword = () => {
    const navigate = useNavigate()

  const [loading, setLoading] = useState(false);

    const user = {
        email: "",
      };
    
      const validYup = Yup.object().shape({
        email: Yup.string()
          .required("Email is required")
          .email("Enter valid email"),
      });
    
      async function forgetPassword(values) {
        setLoading(true)
        try {
          const { data } = await axios.post(
            "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
            values
          );
        
          toast.success(data.message);
    
          navigate("/verifyCode"); 

          setLoading(false)
        } catch (e) {
          toast.error(e.message);
          console.log(e,"error forgetPassword");
          setLoading(false)
        }
      }
    
      const formik = useFormik({
        initialValues: user, 
        onSubmit: forgetPassword, 
        validationSchema: validYup, 
      });




  return (
    <div className=' py-12 my-12'>
        <div className='sm:w-[90%] md:w-[75%] lg:w-[60%] mx-auto my-12'>
        <h1 className="text-green-700 text-4xl font-bold  mb-12">
            Forget Password
          </h1>
            <form onSubmit={formik.handleSubmit} >
              <div className="relative z-0 w-full mb-7 group">
                <input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  type="email"
                  name="email"
                  id="email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  please enter your email...
                </label>
                </div>
                {formik.errors.email && formik.touched.email ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                  role="alert"
                >
                  <span className="font-medium">Error! </span>
                  {formik.errors.email}
                </div>
              ) : (
                ""
              )}
                <button
                type="submit"
                className="focus:outline-none text-green-600 border border-green-600 hover:bg-green-600 hover:text-white focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-12 py-1 me-2 mb-2 duration-500 my-1 group">
                    {loading ? <i className='fa-solid fa-spin fa-spinner text-green-600 group-hover:text-white'></i> : "Verify"}
              </button>
            </form>
        </div>
    </div>
  )
}

export default ForgetPassword