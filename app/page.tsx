"use client";
import CarousellRating, {
  CarouselSpacing,
} from "@/components/home/CarousellRating";
import Footer from "@/components/home/Footer";
import HeroSection from "@/components/home/HeroSection";
import ShopByCategorie from "@/components/home/ShopByCategorie";
import Welcome from "@/components/home/Welcome";
import NavBar from "@/components/NavBar";
import { useState } from "react";

export default function Home() {
  const [thiss, setThis] = useState<number>(3);
  return (
    <div className="flex flex-col ">
      <NavBar />
      {/* <Welcome /> */}
      <HeroSection />
      <ShopByCategorie />
      <CarousellRating />
      <Footer />
    </div>
  );
}
