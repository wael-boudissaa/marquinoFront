import Image from "next/image";
import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";

import InstagramIcon from "@mui/icons-material/Instagram";
const Footer = () => {
  return (
    <div
      // style={{
      //   backgroundImage: `url("/images/qq.png")`,
      // }}
      className="bg-white flex fbg-cover py-4 bg-center bg-cover flex-col bg-white h-full w-full px-14 py-6"
    >
      <div className="p-10 self-center bg-orange-200 h-5/6 flex flex-col w-10/12">
        <div>
          <Image alt="" src={"/images/esi.png"} width={150} height={150} />
        </div>
        <hr
          style={{
            backgroundColor: "#000000",
            marginTop: 20,
            height: 0.5,
            borderColor: "#000000",
          }}
        />
        <div className="w-full flex flex-row">
          <div className="flex flex-col justify-center items-center p-3">
            <h1 className="text-xl font-semibold">Contact us </h1>
            <div className="flex flex-row">
              <InstagramIcon className="text-4xl mr-4 " />
              <FacebookIcon className="text-4xl mr-4 " />
              <EmailIcon className="text-4xl mr-4  " />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
