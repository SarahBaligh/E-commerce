import { useContext } from 'react'
import { CartContext } from '../../Context/CartContext'
import { Circles } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

function Cart() {

    const {totalPrice, products, loading, updateCount, removeItem, clearCart} = useContext(CartContext)

    if (loading) {
        return (
        <div className="h-screen bg-green-700 flex flex-wrap justify-center items-center">
            <Circles
            height="80"
            width="80"
            color="#fff"
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
                    {products?.length == 0 ? <h1 className='text-center text-4xl text-green-700 py-5'>NO DATA TO DISPLAY</h1> : <div>
                        <div>
                            <h1 className=" font-bold text-2xl ">Shop Cart:</h1>
                            <h3 className="text-green-500 my-3 font-mono">Total Cart Price: {totalPrice} EGP</h3>
                        </div>
                        <Link to='/payment' className='border border-green-500 text-green-500 px-2 py-2 rounded-md hover:bg-green-500 hover:text-white text-lg font-semibold duration-500 my-1 '>Check Out 💵</Link>
                        {/* map */}
                        {products?.map(function (product){return <div key={product.product._id} className='flex flex-wrap items-center pb-3 border-b border-slate-300 mt-5'>
                            {/* img */}
                            <div className='w-full md:w-1/6 p-4'>
                                <img src={product.product.imageCover} className='w-full' alt="" />
                            </div>
                            {/* content */}
                            <div className='w-full md:w-4/6 p-4'>
                                <h4 className='mb-1 font-mono text-xl'>{product.product.title}</h4>
                                <h5 className='mb-1 text-green-500'>Price: {product.price} EGP</h5>
                                <button onClick={() => {removeItem(product.product._id)}} className='flex flex-wrap items-center gap-1 hover:bg-green-500 hover:text-white group p-1 rounded-md duration-500'>
                                    <i className="fa-solid fa-trash-can text-green-500 group-hover:text-white duration-500"></i>
                                    <h5>Remove</h5>
                                </button>
                                <h1>{product.cartId}</h1>
                            </div>
                            {/* count */}
                            <div className='w-full md:w-1/6 p-4'>
                                <div className='flex flex-wrap items-center gap-2'>
                                    <button onClick={() => {updateCount(product.product._id , product.count + 1)}} className='w-[30px] h-[30px] border-2 rounded-md border-green-400 flex flex-wrap items-center justify-center hover:bg-green-500 hover:text-white group duration-500'>
                                        +
                                    </button>
                                    <h6>{product.count}</h6>
                                    <button onClick={() => {updateCount(product.product._id , product.count - 1)}} className='w-[30px] h-[30px] border-2 rounded-md border-green-400 flex flex-wrap items-center justify-center hover:bg-green-500 hover:text-white group duration-500'>-</button>
                                </div>
                            </div>
                        </div>})}

                        <div className=' text-center'>
                            <button onClick={clearCart} className='border-2 border-red-700 text-red-900 px-12 py-3 rounded-md hover:bg-red-700 hover:text-white text-xl font-semibold duration-500 my-3 '>
                                Clear Cart
                            </button>
                        </div>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default Cart
