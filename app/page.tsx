"use client";

import Welcome from "@/components/home/Welcome";
import NavBar from "@/components/NavBar";
import { useState } from "react";
export default function Home() {
  const [thiss, setThis] = useState<number>(3);
  return (
    <section className="flex flex-col ">
      <NavBar />
      <Welcome />
      <div></div>
    </section>
  );
}
