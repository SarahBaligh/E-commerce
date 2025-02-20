import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';


const ResetnewPassword = () => {

  const navigate = useNavigate();

  const [isLoading, setisLoading] = useState(false);

  const user = {
    email: "",
    newPassword: "",
  };

  const validYup = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Enter valid email"),
    newPassword: Yup.string().required("newPassword is required").matches(/^[A-Z][a-z0-9]{6,}$/, "newPassword must start with uppercase"),
  });

  async function newPassword(values) {
    setisLoading(true)

    try {
      await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values);

      toast.success("Success");

      navigate("/"); 
      setisLoading(false);

    } catch (e) {
      toast.error(e.message);
      setisLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: user, 
    onSubmit: newPassword,
    validationSchema: validYup, 
  });


  return (
    <div className="py-12 mt-12 ">

      <div className="sm:w-[90%] md:w-[75%] lg:w-[60%] mx-auto my-12">

        <h1 className="text-green-700 text-4xl font-bold  mb-12">
          reset your account newPassword
        </h1>

        <form onSubmit={formik.handleSubmit}>
          {/* email */}
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
              Email
            </label>
          </div>

          {formik.errors.email && formik.touched.email ? (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
              <span className="font-medium">Error! </span>{" "}
              {formik.errors.email}
            </div> ) : ("")
          }

          {/* newPassword */}
          <div className="relative z-0 w-full mb-7 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.newPassword}
              type="Password"
              name="newPassword"
              id="newPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="newPassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              newPassword
            </label>
          </div>

          {formik.errors.newPassword && formik.touched.newPassword ? (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert" >
              <span className="font-medium">Error! </span>{" "}
              {formik.errors.newPassword}
            </div>) : ("")
          }

          <button type="submit" className="focus:outline-none text-green-600 border border-green-600 hover:bg-green-600 hover:text-white focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-12 py-1 me-2 mb-2 duration-700 group">
            {isLoading ? ( <i className='fa-solid fa-spin fa-spinner text-green-600 group-hover:text-white'></i> ) : ( "Reset newPassword" )}
          </button>
        </form>

      </div>

    </div>
  )
}

export default ResetnewPassword