import Image from "next/image";
import React from "react";

const OneItem = () => {
  return (
    <div className=" flex flex-col border w-1/5 px-5 py-4">
      <div>
        <Image
          width={300}
          height={300}
          alt="image"
          src={"/images/product1.png"}
        />
      </div>
      <div>
        <h1 className="text-lg">
          Electric Pump Air Compressor Portable Tire Inflator
        </h1>
        <p className="font-semibold ">12000.00 DZD</p>
      </div>
    </div>
  );
};

export default OneItem;
