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
    <div className="flex flex-col   ">
      <div className="flex flex-col md:mx-24 border my-5 rounded-md p-3">
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

      <div className="flex w-full py-10 gap-10 md:gap-3 px-3 md:p-0 md:px-24 flex-col md:flex-row justify-between bg-slate-100 ">
        <div className=" gap-5 flex flex-col">
          <h2 className="md:text-4xl text-xl font-mier-book  text-slate-800">
            Shop Non-Stop on Meeshio
          </h2>
          <p className="text-lg text-slate-700 leading-5 font-mier">
            Trusted by more than 1 Crore Indians <br /> Cash on Delivery | Free
            Delivery
          </p>
          <div className="flex gap-3">
            <Link className="bg-black w-32 h-11 md:w-44 p-2 md:h-14 rounded-md">
              <img src={playstore} alt="playstore" className="w-full" />
            </Link>
            <Link className="bg-black w-32 h-11 md:w-44 p-2 md:h-14 rounded-md">
              <img src={appstore} alt="appstore" className="w-full" />
            </Link>
          </div>
        </div>
        <div className="">
          <ul className="flex flex-col text-slate-600 font-mier-demi  gap-3 ">
            <li>
              <Link>Careers</Link>
            </li>
            <li>
              <Link>Become a supplier</Link>
            </li>
            <li>
              <Link>Hall of Fame</Link>
            </li>
            <li>
              <Link>Sitemap</Link>
            </li>
          </ul>
        </div>
        <div className="">
          <ul className="flex flex-col gap-3 text-slate-600 font-mier-demi">
            <li>
              <Link>Legal and Policies</Link>
            </li>
            <li>
              <Link>Meeshio Tech Blog</Link>
            </li>
            <li>
              <Link>Notices and Returns</Link>
            </li>
          </ul>
        </div>
        <div className="flex-shrink-0 gap-2 flex flex-col">
          <p className="font-mier-bold">Reach out to us</p>
          <div className="flex gap-3">
            <img src={twitter_icon} alt="" />
            <img src={linkedin_icon} alt="" />
            <img src={facebook_Icon} alt="" />
            <img src={youtube_icon} alt="" />
            <img src={instagram_icon} alt="" />
          </div>
        </div>
        <div className="flex-shrink-0 gap-2 flex flex-col">
          <p className="font-mier-bold">Contact Us</p>
          <div className="flex gap-3 text-wrap w-80">
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
