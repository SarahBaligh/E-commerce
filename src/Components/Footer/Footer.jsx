import amazon from '../../assets/images/amazon2.png'
import americanExp from '../../assets/images/american-express-logo.png';
import masterCard from '../../assets/images/MasterCard_Logo.svg.webp';
import PayPal from '../../assets/images/PayPal.webp';
const Footer = () => {
  return (
    <footer className='px-7 pb-12 pt-5 bg-slate-100 '>
        <div>
            <h2 className='text-xl text-slate-700'>Get the FreshCart app</h2>
            <p className='text-slate-500 text-xs'>We will send you a link, open it on your phone to download the app</p>
        </div>
        <div className='flex flex-wrap justify-center items-center  border-b-2 '>
            <div className='w-3/4 p-3'>
                <input type="email" name="email" id="email" placeholder='Email..' className='w-full py-1 px-2 rounded border' />
            </div>
            <div className='w-1/4 p-3'>
                <button className='bg-green-600 text-white font-thin px-5 py-1 rounded'>Share App Link</button>
            </div>
        </div>

        <div className='flex flex-wrap justify-between items-center border-b-2 '>
            <div className='w-1/2 my-5'>
                <div className='flex flex-wrap items-center '>
                    <h4 className='text-slate-700'>Payment Partners</h4>
                    <img src={amazon} alt="amazon logo" className='w-[6%] ms-3' />
                    <img src={americanExp} alt="americanExpress logo" className='w-[6%] ms-3' />
                    <img src={masterCard} alt="masterCard logo" className='w-[4%] ms-3' />
                    <img src={PayPal} alt="PayPal logo" className='w-[6%] ms-3' />    
                </div>
            </div>
            <div className='w-1/2 my-5'>
                <div className='flex flex-wrap justify-center items-center'>
                    <h5 className='text-slate-700'>Get deliveries with FreshCart</h5>
                    <button className='bg-black text-white ms-2 px-2 py-[2px] rounded'>Google Play</button>
                    <button className='bg-black text-white ms-2 px-2 py-[2px] rounded'>App Store</button>
                </div>            
            </div>
        </div>
    </footer>
  )
}

export default Footer