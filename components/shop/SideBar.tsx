"use client";
import React, { useCallback, useEffect, useState } from "react";

import { Slider } from "@/components/ui/slider";
import { SliderProps } from "@mui/material/Slider/Slider";

interface categorie {
  idCategorie: string;
  nameCategorie: string;
}
const SideBar = () => {
  const [categorie, setCategorie] = useState<categorie[]>([]);
  const fetchCategories = useCallback(async () => {
    try {
      const result = await fetchCategorie();
      setCategorie(result);
    } catch (err) {
      throw new Error("failed");
    }
  }, []);
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="flex flex-col w-1/5">
      <div className="flex flex-col px-12 marginfrombody  ">
        {/* NOTE: this for the product Categorie  */}
        <hr />
        <div className=" flex flex-col my-6">
          <h1 className="text-lg font-semibold">Product Categorie </h1>
          <hr />
          <div className="pl-4">
            {categorie.map((categorie, index) => (
              <p key={index} className="my-3 cursor-pointer ">
                {" "}
                {categorie.nameCategorie}
              </p>
            ))}
          </div>
        </div>

        {/* NOTE: this  should be for the product price   */}
        <div className=" flex flex-col my-6">
          <h1 className="text-lg font-semibold">Price Range</h1>
          <hr />

          <SliderDemo className="px-7 py-4 w-full h-full  " />
          <p>Price:150000dz-320000dz</p>
        </div>
      </div>
    </div>
  );
};

import { cn } from "@/lib/utils";
import { fetchProducts } from "@/services/product";
import { fetchCategorie } from "@/services/categorie";

type SliderProps = React.ComponentProps<typeof Slider>;

export function SliderDemo({ className, ...props }: SliderProps) {
  return (
    <Slider
      defaultValue={[100]}
      max={100}
      step={2}
      className={cn("w-[100%]", className)}
      {...props}
    />
  );
}
export default SideBar;
