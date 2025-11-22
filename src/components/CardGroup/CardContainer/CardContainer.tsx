
import { MasterContext } from "@/context/MasterContext";
import React, { useContext, useEffect } from "react";
import MovieCard from "../CardDetails/MovieCard/MovieCard";
import TvShowCard from "../CardDetails/TvShowCard/TvShowCard";
import Pagination from "../Pagination/pagination";

interface CardGroupProps {
  streamingType: "movie" | "tv";
  activeTab: string;
}
const CardContainer: React.FC<CardGroupProps> = ({
  streamingType,
  activeTab,
}) => {
  const { movies, setMovieOrTV, setTrendingOption } = useContext(MasterContext);

  useEffect(() => {
    setMovieOrTV(streamingType);
    setTrendingOption(activeTab);
  }, [activeTab, setMovieOrTV, setTrendingOption, streamingType]);


  return (
    <>
      <Pagination />
      <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 lg:mx-14 mx-4">
        {movies
          .filter((media) => media.poster_path)
          .map((media, index) =>
            streamingType == "movie" ? (
              <MovieCard key={index} media={media} />
            ) : (
              <TvShowCard key={index} media={media} />
            )
          )}
      </div>
      <Pagination/>
    </>
  );
};

export default CardContainer;
