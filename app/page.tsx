"use client";
import CarousellRating, {
  CarouselSpacing,
} from "@/components/home/CarousellRating";
import Footer from "@/components/home/Footer";
import HeroSection from "@/components/home/HeroSection";
import ShopByCategorie from "@/components/home/ShopByCategorie";
import Welcome from "@/components/home/Welcome";
import Navbar from "@/components/ui/Navbar";
import { useState } from "react";

export default function Home() {
  const [thiss, setThis] = useState<number>(3);
  return (
    <div className="flex flex-col ">
      <Navbar />
      {/* <Welcome /> */}
      <HeroSection />
      <ShopByCategorie />
      <CarousellRating />
      <Footer />
    </div>
  );
}
