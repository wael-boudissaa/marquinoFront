import * as React from "react";
//FIXME:
//TODO:
//NOTE:
//see
//TEST:
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Rating from "./Rating";
import Footer from "./Footer";

const CarousellRating = () => {
  return (
    <div className=" bg-gray-100 flex flex-col w-full h-full my-5 ">
      <h2 className="text-2xl p-5 font-semibold  ">
        People opionon about us :{" "}
      </h2>
      <CarouselSpacing />
    </div>
  );
};

export default CarousellRating;
export function CarouselSpacing() {
  return (
    <Carousel className=" self-center w-9/12 mt-6 mb-16">
      <CarouselContent className="-ml-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex w-96 h-72 flex-col justify-center px-6 py-4">
                  <Rating />
                  <span className="font-mono my-2 ">
                    "On the other hand, we denounce with righteous indignation
                    and dislike men who are so beguiled and demoralized by the
                    charms of pleasure of the moment, so blinded by desire, that
                  </span>{" "}
                  <p className="text-lg font-bold">User Name</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
