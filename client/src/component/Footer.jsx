import React from "react";
import { Link } from "react-router-dom";
import {
  appstore,
  facebook_Icon,
  instagram_icon,
  linkedin_icon,
  playstore,
  twitter_icon,
  youtube_icon,
} from "../assets";
import { navbar_second } from "../utils/constant";

const Footer = () => {
  return (
    <div className="flex flex-col  lg:p-3 md:p-0 ">
      <div className="flex flex-col md:mx-24 border  my-5 rounded-md p-3">
        {navbar_second.map((navList, i) => (
          <div key={i} className="flex flex-wrap overflow-hidden">
            <span className="text-wrap">{navList.title}</span>
            <div className="flex flex-wrap gap-1">
              {navList.links.map((links, index) => (
                <div key={index} className="flex flex-wrap gap-2">
                  <span className="flex">{links.heading}</span>

                  {links.category.map((list, i) => (
                    <span key={i} className="flex text-wrap break-words">
                      {list.title}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex w-full md:py-5 lg:py-10 lg:gap-10 md:gap-3 lg:flex-row px-3 md:p-0 md:px-10  lg:px-24 flex-col md:flex-row justify-between bg-slate-100 ">
        <div className=" lg:gap-5 md:gap-3 flex-wrap flex flex-col">
          <h2 className="lg:text-4xl md:text-2xl font-mier-book  text-slate-800">
            Shop Non-Stop <br /> on Meeshio
          </h2>
          <p className="lg:text-lg text-slate-700 text-wrap lg:leading-5 md:leading-4 whitespace-nowrap font-mier">
            Trusted by more than 1 Crore Indians <br /> Cash on Delivery | Free
            Delivery
          </p>
          <div className="flex flex-col gap-2 lg:gap-3 md:gap-1 md:flex-col lg:flex-row">
            <Link className="bg-black w-32 lg:w-32  md:w-32 h-12 p-2  rounded-md">
              <img src={playstore} alt="playstore" className="w-full" />
            </Link>
            <Link className="bg-black lg:w-32 w-32 h-12 md:w-32  p-2  rounded-md">
              <img src={appstore} alt="appstore" className="w-full" />
            </Link>
          </div>
        </div>
        <div className="">
          <ul className="flex flex-col text-slate-600 font-mier-demi  gap-3 ">
            <li>
              <Link className="whitespace-nowrap">Careers</Link>
            </li>
            <li>
              <Link className="whitespace-nowrap">Become a supplier</Link>
            </li>
            <li>
              <Link className="whitespace-nowrap">Hall of Fame</Link>
            </li>
            <li>
              <Link className="whitespace-nowrap">Sitemap</Link>
            </li>
          </ul>
        </div>
        <div className="">
          <ul className="flex flex-col gap-3 text-slate-600 font-mier-demi">
            <li>
              <Link className="whitespace-nowrap">Legal and Policies</Link>
            </li>
            <li>
              <Link className="whitespace-nowrap">Meeshio Tech Blog</Link>
            </li>
            <li>
              <Link className="whitespace-nowrap">Notices and Returns</Link>
            </li>
          </ul>
        </div>
        <div className="flex-shrink-0 gap-2 flex flex-col">
          <p className="font-mier-bold">Reach out to us</p>
          <div className="flex gap-3 md:flex-col md:justify-center lg:flex-row">
            <img src={twitter_icon} alt="" className="w-8 lg:w-6 lg:h-6" />
            <img src={linkedin_icon} alt="" className="w-8 lg:w-6 lg:h-6" />
            <img src={facebook_Icon} alt="" className="w-8 lg:w-6 lg:h-6" />
            <img src={youtube_icon} alt="" className="w-8 lg:w-6 lg:h-6" />
            <img src={instagram_icon} alt="" className="w-8 lg:w-6 lg:h-6" />
          </div>
        </div>
        <div className="flex-shrink-0 gap-2 flex-wrap flex md:w-52 flex-col">
          <p className="font-mier-bold">Contact Us</p>
          <div className="flex gap-3 text-wrap lg:w-72 flex-wrap">
            Fashnear Technologies Private Limited, CIN: U74900KA2015PTC082263
            3rd Floor, Wing-E, Helios Business Park,Kadubeesanahalli Village,
            Varthur Hobli, Outer Ring Road Bellandur, Bangalore, Bangalore
            South, Karnataka, India, 560103 E-mail address: query@meesho.com ©
            2015-2024 Meeshio.com
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
