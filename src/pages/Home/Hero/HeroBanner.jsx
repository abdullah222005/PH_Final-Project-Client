import { Link, useNavigate } from "react-router-dom";
import banner1 from "../../../assets/banner/banner1.png";
import banner2 from "../../../assets/banner/banner2.png";
import banner3 from "../../../assets/banner/banner3.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BsArrowUpRightCircleFill } from "react-icons/bs";

const HeroBanner = () => {
  const navigate = useNavigate();

  const ResponsiveButtons = (
    <div
      className="
        absolute z-50
        flex items-center gap-3
        left-1/20
        bottom-3.5
        md:bottom-14 md:left-1/15
        lg:bottom-26 lg:left-1/15
      "
    >
      {/* Track Parcel */}
      <button
        className="
          px-2 py-1 rounded-xl bg-primary text-white text-sm
          md:px-5 md:py-2 md:btn
          lg:text-xl lg:px-8 lg:py-6 lg:btn
        "
      >
        Track Your Parcel
      </button>

      {/* Arrow Icon */}
      <BsArrowUpRightCircleFill
        className="
          text-xl
          md:text-3xl
          lg:text-5xl
        "
      />

      {/* Rider button */}
      <Link to="/beArider">
        <button
          className="
          px-2 py-1 bg-white rounded-xl text-sm
          md:px-5 md:py-2 md:btn
          lg:text-lg lg:px-8 lg:py-6 lg:btn
        "
        >
          Be a rider
        </button>
      </Link>
    </div>
  );

  return (
    <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true}>
      <div className="relative my-5 md:my-10 lg:my-15">
        <img src={banner1} className="w-full" />
        {ResponsiveButtons}
      </div>

      <div className="relative  my-5 md:my-10 lg:my-15">
        <img src={banner2} className="w-full" />
        {ResponsiveButtons}
      </div>

      <div className="relative  my-5 md:my-10 lg:my-15">
        <img src={banner3} className="w-full" />
        {ResponsiveButtons}
      </div>
    </Carousel>
  );
};

export default HeroBanner;
