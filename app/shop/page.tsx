import Footer from "@/components/home/Footer";
import NavBar from "@/components/NavBar";
import ItemsShop from "@/components/shop/ItemsShop";
import NavBarItems from "@/components/shop/navBarItems";
import SideBar from "@/components/shop/SideBar";
import React from "react";

const ShopPage = () => {
  return (
    <div className="w-full ">
      <NavBar />
      <div className="flex flex-row w-full px-10">
        <SideBar />
        <ItemsShop />
      </div>
      <Footer />
    </div>
  );
};
export default ShopPage;
