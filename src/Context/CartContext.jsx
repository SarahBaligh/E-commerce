import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext';

    export const CartContext = createContext()

const CartContextProvider = ({children}) => {

    const {token} = useContext(AuthContext)
    const [products, setProducts] = useState([])
    const [numOfItems, setNumOfItems] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [loading, setLoading] = useState(false)
    const [cartId, setCartId] = useState(null)


    // addProductToCart
    async function addProductToCart(id){
        try {
            const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/cart" ,
                {
                    productId: id
                } ,
                {
                    headers: {
                        token: localStorage.getItem("tkn")
                    }
                }
            )
            getUserCart()
            return data
        } catch (error) {
            console.log(error ,"error add product to cartcontext");
        }
    }

    // getUserCart
    async function getUserCart(){
        setLoading(true);
        try {
            const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart" ,
                {
                    headers: {
                        token: localStorage.getItem("tkn")
                    }
                } )

            setNumOfItems(data.numOfCartItems)
            setProducts(data.data.products)
            setTotalPrice(data.data.totalCartPrice)
            
            setCartId(data?.data._id)
            setLoading(false)

        } catch (error) {
            console.log(error ,"error get user cart function in cart context");
            setLoading(false)
        }
    }


    // update count
    async function updateCount(id , count){
        try {
            const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
                count : count
            } , 
        {
            headers:{
                token : localStorage.getItem("tkn")
            }
        })

        setNumOfItems(data.numOfCartItems)
        setProducts(data.data.products)
        setTotalPrice(data.data.totalCartPrice)
        
        } catch (error) {
            console.log(error , "error from updateCount in cartcontext");
        }
    }



    // Remove Item
    async function removeItem(id){
        try {
            const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` ,
                {
                    headers:{token: localStorage.getItem("tkn")}
                }
            )

            setNumOfItems(data.numOfCartItems)
            setProducts(data.data.products)
            setTotalPrice(data.data.totalCartPrice)

        } catch (error) {
            console.log(error , "error from deleteProduct in cartContext");
        }
    }


    // Clear Cart
    async function clearCart(){
        try {
            await axios.delete("https://ecommerce.routemisr.com/api/v1/cart" ,
                {
                    headers:{token: localStorage.getItem("tkn")}
                }
            )

            setNumOfItems(0)
            setProducts([])
            setTotalPrice(0)

        } catch (error) {
            console.log(error , "error from clearCart in cartContext");
            
        }
    }


    useEffect(function(){
        if(token !== null ){
            getUserCart()
        }
    } ,[token])


  return (
    <CartContext.Provider value={
        {  
            addProductToCart ,
            products,
            numOfItems,
            totalPrice,
            loading,
            updateCount,
            removeItem,
            clearCart,
            cartId,
            setNumOfItems,
            setProducts,
            setTotalPrice,      
         }
    }>
        {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider