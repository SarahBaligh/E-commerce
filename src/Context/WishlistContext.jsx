import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { AuthContext } from './AuthContext'

export const WishlistContext = createContext()

const WishlistContextProvider = ({children}) => {

    const {token} = useContext(AuthContext)
    const [wishlist, setWishlist] = useState([])
    const [loading, setLoading] = useState(false)


    async function getUserWishlist(){
        setLoading(true)

        try {
            const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            {   
                headers:{
                    token: localStorage.getItem('tkn')
                }
            })
            setWishlist(data.data)
            setLoading(false)

        } catch (error) {
            console.log(error , "Error getting WishlistContext from AddToWishlist");
            setLoading(false)

        }
    }



    async function AddToWishlist(id){
        try {
            const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
                productId: id
            },
            {
                headers:{
                    token: localStorage.getItem('tkn')
                }
            })
            setWishlist((prevWishlist) => [...prevWishlist, data.data]);
        } catch (error) {
            console.log(error , "Error getting WishlistContext from getUserWishlist");
            toast.error("Failed to add product.");
        }
    }


    
  async function removeFromWishlist(productId) {
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers: { 
            token: localStorage.getItem('tkn')
         } }
      );
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item._id !== productId)
      );
    } catch (error) {
      toast.error(error , "Failed to remove product.");
    }
  }


  useEffect(function(){
    if(token !== null ){
        getUserWishlist();
    }
} ,[token])

  return (
    <WishlistContext.Provider value={
        {
            AddToWishlist,
            wishlist,
            removeFromWishlist,
            setWishlist,
            loading
        }
    }>
        {children}
    </WishlistContext.Provider>
  )
}

export default WishlistContextProvider