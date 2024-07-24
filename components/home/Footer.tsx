import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        backgroundImage: `url("/images/qq.png")`,
      }}
      className="flex fbg-cover py-4 bg-center bg-cover flex-col bg-white h-full w-full px-14 py-6"
    >
      <div className=" self-center bg-orange-200 h-5/6 flex flex-col w-10/12">
        <Image alt="" src={"/images/esi.png"} width={150} height={150} />
      </div>
    </div>
  );
};

export default Footer;
