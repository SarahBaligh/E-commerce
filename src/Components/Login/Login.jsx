import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../../Context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { setToken } = useContext(AuthContext);

  const [isLoading, setisLoading] = useState(false);

  const user = {
    email: "",
    password: "",
  };

  const validYup = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Enter valid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z][a-z0-9]{6,}$/, "Password must start with uppercase"),
  });

  async function SignIn(values) {
    setisLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );

      localStorage.setItem("tkn", data.token);
      setToken(data.token);

      toast.success(data.message);

      navigate("/"); 

      setisLoading(false);
    } catch (e) {
      toast.error(e.response.data.message);
      setisLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: user, 
    onSubmit: SignIn, 
    validationSchema: validYup, 
  });

  return (
    <>
      <div className="py-12 mt-12 ">
        <div className="container mx-auto">
          <h1 className="text-green-700 text-6xl font-bold text-center mb-12">
            Login Now
          </h1>

          <div className="w-[60%] mx-auto ">
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
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                  role="alert"
                >
                  <span className="font-medium">Error! </span>{" "}
                  {formik.errors.email}
                </div>
              ) : (
                ""
              )}

              {/* password */}
              <div className="relative z-0 w-full mb-7 group">
                <input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  type="password"
                  name="password"
                  id="password"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>
              </div>

              {formik.errors.password && formik.touched.password ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                  role="alert"
                >
                  <span className="font-medium">Error! </span>{" "}
                  {formik.errors.password}
                </div>
              ) : (
                ""
              )}

              <div className="flex flex-wrap justify-between items-center">

                <NavLink to={'/forgetPassword'} className='text-lg font-semibold' >
                  Forget Your Password ?
                </NavLink>


              <button
                type="submit"
                className="focus:outline-none text-green-600 border border-green-600 hover:bg-green-600 hover:text-white focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-12 py-1 me-2 mb-2 duration-700 group"
              >
                {isLoading ? (
                  <i className='fa-solid fa-spin fa-spinner text-green-600 group-hover:text-white'></i>
                ) : (
                  "Login"
                )}
              </button>
              </div>
            </form>


          </div>


        </div>
      </div>
    </>
  );
}

export default Login;

