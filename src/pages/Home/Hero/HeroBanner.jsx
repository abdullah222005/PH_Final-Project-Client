import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Assets
import banner1 from "../../../assets/banner/banner1.png";
import banner2 from "../../../assets/banner/banner2.png";
import banner3 from "../../../assets/banner/banner3.png";

const HeroBanner = () => {
  const banners = [banner1, banner2, banner3];

const ActionButtons = (
  <div
    className="
        absolute z-20
        flex items-center gap-2 md:gap-4
        left-[5%] bottom-[8%]
        md:left-[6.5%] md:bottom-[10%]
      "
  >
    {/* Track Parcel - Primary Action with Shine & Pulse */}
    <button
      className="
          relative overflow-hidden group
          bg-primary text-white 
          px-3 py-1.5 md:px-6 md:py-2.5
          rounded-lg md:rounded-xl
          text-[10px] md:text-sm lg:text-lg
          font-bold shadow-md
          transition-all duration-300
          hover:scale-105 hover:shadow-primary/40
          active:scale-95
        "
    >
      <span className="relative z-10">Track Your Parcel</span>
      {/* Shine Animation Overlay */}
      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 opacity-40 group-hover:animate-shine" />
    </button>

    {/* Arrow Icon - Rotating Animation on Hover */}
    <BsArrowUpRightCircleFill
      className="
          text-primary bg-white rounded-full
          text-lg md:text-3xl lg:text-5xl
          shadow-sm transition-transform duration-500
          hover:rotate-[360deg] hover:scale-110
        "
    />

    {/* Rider button - Secondary Action with Lift & Border Glow */}
    <Link to="/beArider">
      <button
        className="
            bg-white text-black
            px-3 py-1.5 md:px-6 md:py-2.5
            rounded-lg md:rounded-xl
            text-[10px] md:text-sm lg:text-lg
            font-bold shadow-md
            transition-all duration-300
            hover:bg-gray-50 hover:-translate-y-1 hover:shadow-lg
            active:translate-y-0 active:scale-95
          "
      >
        Be a rider
      </button>
    </Link>
  </div>
);

  return (
    <div className="w-full overflow-hidden pb-8 md:mb-12">
      <Carousel
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showIndicators={true}
        emulateTouch={true}
        className="zapshift-hero"
      >
        {banners.map((img, index) => (
          <div
            key={index}
            className=" bg-linear-to-r from-[#FEFEFC] to-[#E6F6B7]"
          >
            <div className="relative aspect-[16/7] md:aspect-[10/4] lg:aspect-[10/3.5] max-w-16/17 mx-auto">
              <img
                src={img}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover aspect-auto"
              />
              {ActionButtons}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroBanner;
