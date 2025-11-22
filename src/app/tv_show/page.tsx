/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import CardContainer from "@/components/CardGroup/CardContainer/CardContainer";
import MainContext, { MasterContext } from "@/context/MasterContext";
import React, { useContext, useState } from "react";

const TVshowPage = () => {
  const {setDetailsType , setTrendingOption} = useContext(MasterContext);
  const [activeTab, setActiveTab] = useState<string>("top_rated");
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setDetailsType('tv');
  };
  return (
    <MainContext>
      <h2 className=" text-2xl text-yellow-500 font-bold ml-20 my-8">
       Explore TV Shows
      </h2>
      {/* <div className="flex flex-auto px-2 py-2 round rounded-box bg-blue-50"></div> */}
      <div role="tablist" className=" flex justify-center tabs tabs-lift tabs-md my-10 text-xl">
        <a
          role="tab"
          onClick={() => {
            handleTabClick("popular");
          }}
          className={`tab hover:text-yellow-500 ${
            activeTab === "popular"
              ? "tab-active text-yellow-500 text-bold"
              : ""
          }`}
        >
          Popolar
        </a>
        <a
          role="tab"
          onClick={() => {
            handleTabClick("top_rated");
          }}
          className={`tab hover:text-yellow-500 ${
            activeTab === "top_rated"
              ? "tab-active text-yellow-500 text-bold"
              : ""
          }`}
        >
          Top Rated
        </a>
        <a
          role="tab"
          onClick={() => {
            handleTabClick("on_the_air");
          }}
          className={`tab hover:text-yellow-500 ${
            activeTab === "on_the_air"
              ? "tab-active text-yellow-500 text-bold"
              : ""
          }`}
        >
          On The Air
        </a>
      </div>
      <CardContainer streamingType="tv" activeTab={activeTab} />
    </MainContext>
  );
};

export default TVshowPage;
