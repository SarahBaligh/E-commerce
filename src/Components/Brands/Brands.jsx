import axios from 'axios';
import { Circles } from 'react-loader-spinner';
import { useQuery } from 'react-query';
function Brands() {
    async function getBrands(){
        return await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
    }

    const {data, isLoading} = useQuery('categories' , getBrands)


    if(isLoading){
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
        <div className="py-7">
            <div className='md:w-[90%] mx-auto'>
                <h1 className="text-green-600 text-4xl font-semibold text-center mb-3">All Brands</h1>

                <div className='flex flex-wrap items-center p-6'>
                    {data?.data.data.map(function(items){
                        return <div key={items.id} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-3  '>
                            <div className='hover:shadow-[0_1px_10px_1px] hover:shadow-green-600 duration-[0.5s] border mb-3 rounded-md'>
                                <div>
                                    <img src={items.image} className='w-full rounded-md' alt="" />
                                </div>
                                <div className='py-3 text-center'>
                                    <h2>{items.name}</h2>
                                </div>
                            </div>
                        </div>                
                    })}
                </div>
            </div>
        </div>
        </>
    )
}

export default Brands
