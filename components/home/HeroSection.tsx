import React, { useEffect, useState } from "react";
import Carrousel from "../ui/Carrousel";
import Hero from "../ui/Hero";

import banner1 from "../../components/ui/assets/images/banners/banner1.webp";
import banner2 from "../../components/ui/assets/images/banners/banner2.webp";
import banner4 from "../../components/ui/assets/images/banners/banner1.webp";
import banner5 from "../../components/ui/assets/images/banners/banner1.webp";
import banner6 from "../../components/ui/assets/images/banners/banner1.webp";

const HeroSection = () => {
  return (
    <header className="h-96 md:h-[35rem]">
      <Carrousel
        content={[
          <Hero
            title="Summer Value Pack"
            subtitle="Category placehldr"
            textLocation="left"
            imgLink={banner1}
            btnLink="/store"
            btnText="Shop Now"
            btnTransparent={false}
          />,
          <Hero
            title="Summer Value Pack 2"
            subtitle="Category placehldr"
            textLocation="left"
            imgLink={banner2}
            btnLink="/store"
            btnText="Shop Now"
            btnTransparent={false}
          />,
        ]}
      />
    </header>
  );
};

export default HeroSection;
