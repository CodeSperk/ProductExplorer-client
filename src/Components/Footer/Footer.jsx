import { FaFacebookF, FaInstagram, FaLocationArrow, FaPhone, FaTwitter } from "react-icons/fa";
import logo from "/favicon.png";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {


  const year = new Date().getFullYear();
 
  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-10 2xl:px-14">
      {/* footer top */}
      <div className="flex flex-col md:flex-row justify-between gap-10">

        {/* Logo+name & social media */}
        <div className="max-w-80 flex flex-col ">
          <div className="cursor-pointer flex items-center gap-2 flex-1  mb-4">
            <img src={logo} alt="" className="w-8" />
            <h3>
              <span className="text-[var(--clr-focussed)]">Product</span>Explorer
            </h3>
          </div>

          <div className="space-y-4">
            <p className="text-justify">
              Discover the latest and trendy products and have great experience. We believe in quality service. Thanks for staying with us.
            </p>

            {/* social links */}
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[var(--clr-focussed)] rounded-full flex justify-center items-center text-xl cursor-pointer hover:scale-110 duration-300">
                <FaTwitter />
              </div>
              <div className="w-8 h-8 bg-[var(--clr-focussed)] rounded-full flex justify-center items-center text-xl cursor-pointer hover:scale-110 duration-300">
                <FaFacebookF />
              </div>
              <div className="w-8 h-8 bg-[var(--clr-focussed)] rounded-full flex justify-center items-center text-xl cursor-pointer hover:scale-110 duration-300">
                <FaInstagram />
              </div>
            </div>
          </div>
        </div>


        {/* About part */}
        <div className="max-w-80 flex flex-col">
          {/* title */}
          <div className="cursor-pointer flex items-center gap-2 mb-4">
            <h4>
              Contact Us
            </h4>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4 items-center flex-1">
              <FaLocationDot className="text-2xl"/>
              <p>SR Parcel correct Address at 31/6, Tajmahal Rd, Dhaka, Bangladesh</p>
            </div>

            <div className="flex gap-4">
              <FaPhone />
              <p>+880 1852 428 440</p>
            </div>
            <div className="flex gap-4">
            <FaLocationArrow />
            <p>inbx.mahbub@gmail.com</p>
            </div>
            
          </div>
        </div>
      </div>

{/* copyright */}
      <div className="border-t border-[var(--clr-light-gray)] mt-12 text-center pt-10">
        <p>Copyright @{year} all right reserved!</p>

      </div>
    </div>
  );
};

export default Footer;