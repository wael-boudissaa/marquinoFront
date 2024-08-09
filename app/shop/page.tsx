import NavBar from "@/components/NavBar";
import ItemsShop from "@/components/shop/ItemsShop";
import SideBar from "@/components/shop/SideBar";
import React from "react";

const ShopPage = () => {
  return (
    <div className="w-full ">
      <NavBar />
      <div className="flex flex-row w-full ">
        <SideBar />
        <ItemsShop />
      </div>
    </div>
  );
};
export default ShopPage;
