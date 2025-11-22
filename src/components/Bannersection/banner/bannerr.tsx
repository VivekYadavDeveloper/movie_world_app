"use client";

import React, { useContext, useEffect, useState } from "react";
import BannerSingle from "../BannerSingle/banner_singles";
import { MasterContext } from "@/context/MasterContext";
import "./Banner.css";

const Banner = () => {
  const { movies } = useContext(MasterContext);
  console.log(movies);
  /* Create States */
  const [currentItem, setCurrentItem] = useState(1);
  const [progress, setProgress] = useState(1);
  const [countDown, setCountdown] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(0);
      setCountdown(5);
      setCurrentItem((prevItem) => (prevItem === 6 ? 1 : prevItem + 1));
    }, 5000 /* 5 sec */);

    const progresssInterval = setInterval(() => {
      setProgress((prev) => prev + 1);
      setCountdown((prev) => (prev > 1 ? prev - 0.05 : prev));
    }, 50);
    /* Cleanup/Dispose function */
    return () => {
      clearInterval(interval);
      clearInterval(progresssInterval);
    };
  }, [currentItem]);

  return (
    
    <div className="carousel-container">
      <div className="carousel">
        {movies.map((movie, index) => {
          return (
            <BannerSingle
              movie={movie}
              key={movie.id}
              currentItem={currentItem}
              itemIndex={index + 1}
              
            />
          );
        })}
      </div>

      {/* buttons for the slider */}
      <div className="slider-buttons">
        <button
          onClick={() => setCurrentItem(1)}
          className={`btn btn-xs slider-btn ${
            currentItem === 1 ? "btn-active active" : ""
          }`}
        >
          1
        </button>
        <button
          onClick={() => setCurrentItem(2)}
          className={`btn btn-xs slider-btn ${
            currentItem === 2 ? "btn-active active" : ""
          }`}
        >
          2
        </button>
        <button
          onClick={() => setCurrentItem(3)}
          className={`btn btn-xs slider-btn ${
            currentItem === 3 ? "btn-active active" : ""
          }`}
        >
          3
        </button>
        <button
          onClick={() => setCurrentItem(4)}
          className={`btn btn-xs slider-btn ${
            currentItem === 4 ? "btn-active active" : ""
          }`}
        >
          4
        </button>
        <button
          onClick={() => setCurrentItem(5)}
          className={`btn btn-xs slider-btn ${
            currentItem === 5 ? "btn-active active" : ""
          }`}
        >
          5
        </button>
        <button
          onClick={() => setCurrentItem(6)}
          className={`btn btn-xs slider-btn ${
            currentItem === 6 ? "btn-active active" : ""
          }`}
        >
          6
        </button>
      </div>

      {/* Circular progress bar with countdown */}
      <div className="progress-container">
        <svg className="progress-svg">
          <circle className="progress-bg-circle" r="18" cx="24" cy="24" />
          <circle
            className="progress-circle"
            strokeDashoffset={113 - (113 * progress) / 100}
            r="18"
            cx="24"
            cy="24"
          />
          <text x="24" y="28" className="progress-text">
            {Math.ceil(countDown)}
          </text>
        </svg>
      </div>
    </div>
  );
};

export default Banner;
