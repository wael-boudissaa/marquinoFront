import Footer from "@/components/home/Footer";
import Navbar from "@/components/ui/Navbar";
import ItemsShop from "@/components/shop/ItemsShop";
import NavBarItems from "@/components/shop/navBarItems";
import SideBar from "@/components/shop/SideBar";
import React from "react";

const ShopPage = () => {
  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="flex flex-row w-full px-10 h-screen">
        <SideBar />
        <ItemsShop />
      </div>
      <Footer />
    </div>
  );
};
export default ShopPage;
