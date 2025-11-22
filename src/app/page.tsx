"use client";

import React from "react";

import CardContainer from "@/components/CardGroup/CardContainer/CardContainer";
import SliderContainer from "@/components/Slider/SliderContainer/SliderContainer";
import MainContext from "@/context/MasterContext";
import Banner from "@/components/Bannersection/Banner/Banner";

export default function Home() {
  return (
    <div className="font-sans items-start justify-items-start min-h-screen p-1 pb-20 gap-16 sm:p-8">
      <main className="w-full items-center sm:items-start">
        <MainContext>
          <Banner />
          <SliderContainer />
          <h2 className="text-2xl text-yellow-500 font-bold ml-16 mb-8">
            Top Rated Movies
          </h2>
          <CardContainer streamingType={"movie"} activeTab={"top_rated"} />
        </MainContext>
      </main>
    </div>
  );
}
