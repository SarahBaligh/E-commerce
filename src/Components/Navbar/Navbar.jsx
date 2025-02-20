import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "./../../assets/images/freshcart-logo.svg";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { CartContext } from "../../Context/CartContext";

function Navbar() {
  const { token, setToken } = useContext(AuthContext);
  const {numOfItems} = useContext(CartContext)

  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("tkn");
    setToken(null);
    navigate("/login");
  }

  return (<>

      <nav className="bg-gray-100 fixed w-full z-20 top-0 start-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          
          <Link to={"/"} className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} alt="freshcart-logo" className="w-[160px]" />
          </Link>

          <div className="flex md:order-2 space-x-3 lg:space-x-0 rtl:space-x-reverse">
            <ul className="flex flex-wrap  text-gray-700 lg:flex-row justify-between">
              {token ? (
                  <div className="flex flex-wrap lg:flex-row justify-between items-center gap-2">
                    <li className="mx-2 my-2 lg:my-0 relative text-gray-700 hover:text-gray-900">
                      <NavLink to="/cart"><i className="fa-solid fa-cart-shopping text-xl lg:text-2xl ">
                        <div className="absolute inline-flex items-center justify-center w-6 h-4 lg:h-5 text-xs font-bold text-white bg-green-600 border-2 border-white rounded-lg -top-2 -end-2 ">{numOfItems}</div>
                        </i>
                      </NavLink>
                    </li>
                    <li className="mx-2 my-2 lg:my-0 hover:text-gray-900">
                      <button onClick={logout}>Logout</button>
                    </li>
                  </div>
                    ) : (
                        <>
                          <li className="mx-2 my-2 lg:my-0 hover:text-gray-900">
                            <NavLink to="/login">Login</NavLink>
                          </li>
                          <li className="mx-2 my-2 lg:my-0 hover:text-gray-900">
                            <NavLink to="/register">Register</NavLink>
                          </li>
                        </>
                        )}
            </ul> 

              <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>

          </div>

          <div className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 lg:p-0 mt-4 font-medium text-gray-700 lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0   ">
              {token ? (
                        <>
                          <li className="mx-2 my-2 lg:my-0 hover:text-gray-900">
                            <NavLink to="/">Home</NavLink>
                          </li>
                          <li className="mx-2 my-2 lg:my-0 hover:text-gray-900">
                            <NavLink to="/brands">Brands</NavLink>
                          </li>
                          <li className="mx-2 my-2 lg:my-0 hover:text-gray-900">
                            <NavLink to="/category">Category</NavLink>
                          </li>
                          <li className="mx-2 my-2 lg:my-0 hover:text-gray-900">
                            <NavLink to="/products">Products</NavLink>
                          </li>
                          <li className="mx-2 my-2 lg:my-0 hover:text-gray-900">
                            <NavLink to="/wishlist">WishList</NavLink>
                          </li>
                          <li className="mx-2 my-2 lg:my-0 hover:text-gray-900">
                            <NavLink to="/allorders">AllOrders</NavLink>
                          </li>
                        </>
                      ) : ("")}
            </ul>
          </div>

        </div>
      </nav>

    </>
  );
}

export default Navbar;
