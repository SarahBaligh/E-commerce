import Slider from "react-slick";
import img1 from "../../assets/images/grocery-banner.png";
import img2 from "../../assets/images/grocery-banner-2.jpeg";
import slider1 from "../../assets/images/slider-image-1.jpeg";
import slider2 from "../../assets/images/slider-image-2.jpeg";
import slider3 from '../../assets/images/slider-image-3.jpeg'

export default function HomeSlider() {
  var settings = {
    dots: true, 
    infinite: true, 
    speed: 4000, 
    slidesToShow: 1, 
    slidesToScroll: 1, 
    arrows: false,
    autoplay: true,
    autoplaySpeed: 500,
  };
  return (
    <div className="py-7 ">
      <div className="flex flex-wrap justify-center items-center">
        <div className="w-2/3">
          <Slider {...settings}>
            <div>
              <img src={slider1} className="w-full h-[400px]" alt="" />
            </div>
            <div>
              <img src={slider2} className="w-full h-[400px]" alt="" />
            </div>
            <div>
              <img src={slider3} className="w-full h-[400px]" alt="" />
            </div>
          </Slider>
        </div>
        <div className="w-1/3">
          <div>
            <img src={img1} className="w-full h-[200px]" alt="" />
          </div>
          <div>
            <img src={img2} className="w-full h-[200px]" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
