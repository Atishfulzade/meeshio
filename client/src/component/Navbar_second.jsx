import React from "react";
import { Link } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { Button } from "../components/ui/button";
import { navbar_second } from "../utils/constant";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
const Navbar_second = () => {
  const ismobile = useSelector((state) => state.identifyMobile.isMobile);
  console.log(ismobile);

  return (
    <div className="w-full h-12">
      <div className="hidden md:flex w-full h-full items-center justify-between md:px-20">
        {navbar_second.map((item, itemIndex) => (
          <HoverCard key={itemIndex}>
            <HoverCardTrigger asChild>
              <Button
                variant="link"
                className="text-slate-800 decoration-2 underline-offset-[17px] font-normal justify-center items-center flex flex-col h-full"
              >
                <p className="text-[17px] font-medium hover:text-fuchsia-600 transition-all font-mier-book">
                  {item.title}
                </p>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="md:w-[90vw] p-0 mt-[-3px]">
              <div className="flex w-full px-3">
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
                        to={category.url}
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
