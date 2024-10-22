import Image from "next/image";
import React from "react";
interface OneItemProps {
  nameProduct: string;
  price: string; // Depending on how you handle prices (string or number)
}
const OneItem: React.FC<OneItemProps> = ({ nameProduct, price }) => {
  return (
    <div className="flex flex-col border w-1/5 px-5 py-4">
      <div>
        <Image
          width={300}
          height={300}
          alt="Product Image"
          src={"/images/product1.png"} // Ensure src points to a valid path
        />
      </div>
      <div>
        <h1 className="text-lg">{nameProduct}</h1>
        <p className="font-semibold ">{price}</p>
      </div>
    </div>
  );
};

export default OneItem;
