"use client";

import CarousellRating, {
  CarouselSpacing,
} from "@/components/home/CarousellRating";
import ShopByCategorie from "@/components/home/ShopByCategorie";

import Welcome from "@/components/home/Welcome";
import NavBar from "@/components/NavBar";
import { useState } from "react";
export default function Home() {
  const [thiss, setThis] = useState<number>(3);
  return (
    <div className="flex flex-col ">
      {/* <NavBar /> */}
      {/* <Welcome /> */}
      <ShopByCategorie />
      <CarousellRating />
    </div>
  );
}
