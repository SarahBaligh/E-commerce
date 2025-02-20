import axios from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategorySlider() {

    async function getAllCategory(){
        return await axios.get("https://ecommerce.routemisr.com/api/v1/categories") 
    }


    const {data} = useQuery("categories" , getAllCategory)


  var settings = {
    dots: true, // elno2t eli t7to
    infinite: true, // ysht8l lwa7do mra wla infinite
    speed: 4000, //ytn2l bsor3t ad eh
    slidesToShow: 6, // lma bslide bshow element wahd
    slidesToScroll: 6, // lma bslide b element wahd
    arrows: false,
    autoplay: true,
    autoplaySpeed: 500,
  };
  return (
    <div className="py-7">
      <Slider {...settings}>
        {data?.data.data.map(function(item , idx){
          return <div key={idx}>
              <img src={item.image} className="w-full h-[200px]" alt="" />
              <h3 className="mt-2 ">{item.name}</h3>
          </div>
        })}
      </Slider>
    </div>
  );
}