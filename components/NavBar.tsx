import React from "react";
import imga from "../public/images/esi.png";
import Image from "next/image";
import Link from "next/link";
const NavBar = () => {
  return (
    <div className="flex flex-row bg-orange-100  fixed justify-between z-10 items-center px-14 py-5 w-full border border-b-2 ">
      <div>
        {/* FIXME: this section is for the image */}
        {/* <Image width={100} height={100} src={imga} alt="logo" /> */}
        <h1 className="text-3xl text-black font-bold ">Marquino</h1>
      </div>
      <div className="flex flex-row w-4/12 justify-between">
        <Link href={"/"}>
          <h2 className="text-lg cursor-pointer text-black font-semibold">
            Home
          </h2>
        </Link>
        <h2 className="text-lg cursor-pointer  text-black font-semibold">
          Contact us{" "}
        </h2>
        <Link href={"/shop"}>
          <h2 className="text-lg cursor-pointer  text-black font-semibold">
            Shop
          </h2>
        </Link>

        <h2 className="text-lg text-black cursor-pointer font-semibold">
          About us{" "}
        </h2>
      </div>
    </div>
  );
};

export default NavBar;
