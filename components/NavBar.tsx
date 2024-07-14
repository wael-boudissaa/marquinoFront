import React from "react";
import imga from "../public/images/esi.png";
import Image from "next/image";
const NavBar = () => {
  return (
    <div className="flex flex-row justify-between items-center px-14 py-5 w-full border-black border-b-2 ">
      <div>
        {/* <Image width={100} height={100} src={imga} alt="logo" /> */}
        <h1 className="text-3xl text-black font-bold ">Marquino</h1>
      </div>
      <div className="flex flex-row w-4/12 justify-between">
        <h2 className="text-lg tex  text-black font-semibold">Home</h2>
        <h2 className="text-lg tex  text-black font-semibold">Contact us </h2>
        <h2 className="text-lg tex  text-black font-semibold">Shop</h2>
        <h2 className="text-lg tex  text-black font-semibold">About us </h2>
      </div>
    </div>
  );
};

export default NavBar;
