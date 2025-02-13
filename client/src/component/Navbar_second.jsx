import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { Button } from "../components/ui/button";
import { navbar_second } from "../utils/constant";
import { useSelector } from "react-redux";
const Navbar_second = () => {
  const ismobile = useSelector((state) => state.identifyMobile.isMobile);
  const navigate = useNavigate();
  return (
    <div className=" w-full lg:h-12 md:h-10">
      <div className=" md:flex bg-white  items-center justify-between md:px-10 lg:px-20 ">
        {navbar_second.map((item, itemIndex) => (
          <HoverCard key={itemIndex}>
            <HoverCardTrigger asChild>
              <Button
                variant="link"
                className="text-slate-800 px-1 py-3 decoration-2 lg:underline-offset-[17px] md:underline-offset-[14px] font-normal  h-full"
              >
                <p className="lg:text-[17px] md:text-[14px] font-medium hover:text-fuchsia-600 transition-all font-mier-book">
                  {item.title}
                </p>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="md:w-[90vw] p-0 ">
              <div className="flex w-full lg:px-3">
                {item.links.map((link, index) => (
                  <div
                    key={index}
                    className={`flex flex-col px-6 py-3 min-w-32 ${
                      index % 2 === 0 ? "" : "bg-slate-100"
                    }`}
                  >
                    <h1 className="text-fuchsia-600 font-mier mb-3">
                      {link.heading}
                    </h1>
                    {link.category.map((category, i) => (
                      <Link
                        to={`category/${category.title}`}
                        key={i}
                        className="text-slate-600 hover:text-slate-900 mt-1 font-mier"
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
      {!ismobile && <Separator />}
    </div>
  );
};

export default Navbar_second;
