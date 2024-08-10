import React from "react";

import { Slider } from "@/components/ui/slider";
import { SliderProps } from "@mui/material/Slider/Slider";
const SideBar = () => {
  return (
    <div className="flex flex-col w-1/5">
      <div className="flex flex-col px-12 marginfrombody  ">
        {/* NOTE: this for the product Categorie  */}
        <hr />
        <div className=" flex flex-col my-6">
          <h1 className="text-lg font-semibold">Product Categorie </h1>
          <hr />
          <p className="my-2">Categorie 1</p>
          <p className="my-2">Categorie 1</p>
          <p className="my-2">Categorie 1</p>
          <p className="my-2">Categorie 1</p>

          <p className="my-2">Categorie 1</p>
          <p className="my-2">Categorie 1</p>
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
