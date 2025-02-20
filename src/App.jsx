import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Brands from "./Components/Brands/Brands";
import Category from "./Components/Category/Category";
import Error from "./Components/Error/Error";
import Layout from "./Components/Layout/Layout";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { QueryClient ,QueryClientProvider } from "react-query";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import Products from "./Components/Products/Products";
import WishList from "./Components/WishList/WishList";
import Payment from "./Components/Payment/Payment";
import WishlistContextProvider from "./Context/WishlistContext";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import VerifyCode from "./Components/VerifyCode/VerifyCode";
import ResetPassword from "./Components/resetPassword/resetPassword";
import AllOrders from "./Components/AllOrders/AllOrders";

function App() {

  const x = new QueryClient()

  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "/", element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "/cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "/productDetails/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/forgetPassword", element: <ForgetPassword /> },
        { path: "/verifyCode", element: <VerifyCode /> },
        { path: "/resetPassword", element: <ResetPassword /> },
        { path: "/brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: "/category", element: <ProtectedRoute><Category /></ProtectedRoute> },
        { path: "/products", element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: "/wishlist", element: <ProtectedRoute><WishList /></ProtectedRoute> },
        { path: "/payment", element: <ProtectedRoute><Payment /></ProtectedRoute> },
        { path: "/allorders", element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
        { path: "*", element: <Error /> },
      ],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={x}>
        <AuthContextProvider>
          <CartContextProvider>
            <WishlistContextProvider>
              <Toaster />
              <RouterProvider router={router} />
            </WishlistContextProvider>
          </CartContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
