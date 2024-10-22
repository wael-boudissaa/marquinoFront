import React from "react";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import banner3 from "../../components/ui/assets/images/banners/banner3.webp";
import banner4 from "../../components/ui/assets/images/banners/banner4.webp";
import banner5 from "../../components/ui/assets/images/banners/banner5.webp";
import banner6 from "../../components/ui/assets/images/banners/banner6.webp";
import Card from "../ui/Card";
import Section from "../ui/Section";

const ShopByCategorie = () => {
  return (
    <div className="mx-4 mt-20 lg:mx-24">
      {/* Highlighted categories */}
      <div className="flex gap-2 justify-center md:gap-6">
        <div className="h-[16rem] lg:h-[22rem] w-full">
          <Card
            title="High Coziness"
            subtitle="Category placehldr"
            textLocation="left"
            imgLink={banner3}
            btnLink="/store"
            btnText="Shop Now"
            btnTransparent
          />
        </div>

        <div className="h-[16rem] lg:h-[22rem] w-full">
          <Card
            title="Summer Style"
            subtitle="Category placehldr"
            textLocation="left"
            imgLink={banner3}
            btnLink="/store"
            btnText="Shop Now"
            btnTransparent
          />
        </div>
      </div>

      {/* Big saving zone */}
      <div className="mt-16">
        <Section title="Big Saving Zone">
          <div className="grid  gap-4">
            <div className="grid md:grid-cols-3 mt-8 gap-4 h-[42rem] w-full md:h-[22rem]">
              <Card
                title="Hawaiian Shirts"
                subtitle="Category placehldr"
                textLocation="left"
                imgLink={banner3}
                btnLink="/store"
                btnText="Shop Now"
                btnTransparent
              />

              <Card
                title="Printed T-Shirt"
                subtitle="Category placehldr"
                textLocation="right"
                imgLink={banner4}
                btnLink="/store"
                btnText="Shop Now"
                btnTransparent
              />

              <Card
                title="Cargo Joggers"
                subtitle="Category placehldr"
                textLocation="right"
                imgLink={banner5}
                btnLink="/store"
                btnText="Shop Now"
                btnTransparent
              />
            </div>
            <div className="grid grid-cols-2 gap-4 h-[16rem] w-full md:h[22rem]">
              <Card
                title="Urban Shirts"
                subtitle="Category placehldr"
                textLocation="right"
                imgLink={banner5}
                btnLink="/shop"
                btnText="Shop Now"
                btnTransparent
              />

              <Card
                title="Oversized"
                subtitle="Category placehldr"
                textLocation="right"
                imgLink={banner6}
                btnLink="/store"
                btnText="Shop Now"
                btnTransparent
              />
            </div>
          </div>
        </Section>
      </div>
      <Compo />
    </div>
  );
};
const ShopCard = () => {
  return (
    <div className="my-5 flex flex-col w-1/4  h-full border-gray-50">
      <div
        style={{
          backgroundImage: `url("/images/wolf.jpeg")`,
        }}
        className="bg-cover py-4 bg-center  h-96 flex mr-5 flex-col items-center justify-end"
      ></div>
      <div>
        <h3 className="slef-start text-lg">Title Product </h3>
        <p className=" ml-2 font-bold">23.00$</p>
      </div>
    </div>
  );
};
const CategorieCard = ({ name, image }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
      }}
      className="bg-cover py-4 bg-center w-1/5 h-96 border-gray-50 rounded-lg flex mr-5 flex-col items-center justify-end"
    >
      <div className="w-20 px-12 flex justify-center py-2 bg-orange-200 rounded-xl">
        {" "}
        {name}
      </div>
    </div>
  );
};
const Compo = () => {
  return (
    <div className="w-full my-1 h-full ">
      <h1>Trending suits :</h1>
      <div className="flex flex-row w-full ">
        <ShopCard />
        <ShopCard />
        <ShopCard />
        <ShopCard />
      </div>
    </div>
  );
};

export default ShopByCategorie;
