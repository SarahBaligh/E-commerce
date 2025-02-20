import axios from 'axios'
import { Circles } from 'react-loader-spinner';
import { useQuery } from 'react-query'
function Category() {

    async function getCategory(){
        return await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }

    const {data , isLoading} = useQuery('categories' , getCategory)


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
        <div className='py-12 mt-12'>
            <div className='md:w-[90%] mx-auto'>
                {/* map */}
                <div className='flex flex-wrap items-center p-6'>
                    {data?.data.data.map(function(items){
                        return <div key={items.id} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 '>
                            <div className='hover:shadow-[0_1px_10px_1px] hover:shadow-green-600 duration-[0.5s] border rounded-b-md mb-3'>
                                <div>
                                    <img src={items.image} className='w-full h-80' alt="" />
                                </div>
                                <div className='py-3 text-center text-green-700 text-2xl'>
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

export default Category
