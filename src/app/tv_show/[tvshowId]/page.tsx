/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import SimilarMovieGroup from "@/components/SimilarMovieGroup/SimilarMovieGroup";
import { MasterContext } from "@/context/MasterContext";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import SceneGallery from "@/components/SceneGallery/SceneGallery";
import SceneModal from "@/components/SceneModal/SceneModal";
import Trailers from "@/components/Trailers/Trailers";
import MediaDetails from "@/components/MediaDetails/MediaDetails";
import Castings from "@/components/Casting/Casting";
import { Credits } from "@/type/CreditsType";
import { ImageDetails } from "@/type/SceneType";
import { SingleMovie } from "@/type/SingleMovieType";
import { VideoData } from "@/type/YoutubeType";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "b63e955afbf443c9323b45b9c81c3d68";

const DetailedTvShowPage = () => {
  const { detailsType } = useContext(MasterContext);
 const [movie, setMovie] = useState<SingleMovie | null>(null);
   const [youtubeData, setYoutubeData] = useState<VideoData[] | null>(null);
   const [credits, setCredits] = useState<Credits | null>(null); // For movie credits
   const [sceneImages, setSceneImages] = useState<ImageDetails[]>([]); // For movie scene images
   const [selectedImage, setSelectedImage] = useState<string | null>(null); // For the selected scene image

  const pathname = usePathname();
  const segments = pathname?.split("/") || [];
  const numericTvShowId = Number(segments[segments.length - 1]);

  const imageUrl =
    movie && movie.poster_path
      ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
      : "noImage";

  const backDropImg =
    movie && movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
      : "noBanner";

  const featuredCrew = credits?.crew.filter((member: any) =>
    ["Director", "Producer", "Screenplay", "Writer"].includes(member.job)
  );

  //single details
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/tv/${numericTvShowId}?api_key=${API_KEY}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchMovieData();
  }, [numericTvShowId, detailsType]);

  //youtube data
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/tv/${numericTvShowId}/videos?api_key=${API_KEY}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setYoutubeData(data.results.slice(0, 6));
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchMovieData();
  }, [numericTvShowId]);

  //crew
  useEffect(() => {
    const fetchMovieCredits = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/tv/${numericTvShowId}/credits?api_key=${API_KEY}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setCredits(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchMovieCredits();
  }, [numericTvShowId]);

  useEffect(() => {
    const fetchMovieImages = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/tv/${numericTvShowId}/images?api_key=${API_KEY}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setSceneImages(data.backdrops.slice(0, 6));
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchMovieImages();
  }, [numericTvShowId]);

  const genreNames: string = movie?.genres
    ? movie?.genres.map((genre: { name: string }) => genre.name).join(", ")
    : '';

  const handleOpenModal = (image: string) => {
    setSelectedImage(image);
    const dialog = document.getElementById("scene_modal") as HTMLDialogElement;
    if (dialog) {
      dialog.showModal();
    }
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    const dialog = document.getElementById("scene_modal") as HTMLDialogElement;
    if (dialog) {
      dialog.close();
    }
  };

  return (
    <div>
      {movie ? (
        <>
          <MediaDetails
            movie={movie}
            genreNames={genreNames}
            featuredCrew={credits?.crew ?? []}
            handleOpenModal={handleOpenModal}
          />
          <Trailers youtubeData={youtubeData} />
          <Castings cast={credits?.cast || []} />
          <SceneGallery
            mediaType={"movie"}
            sceneImages={sceneImages}
            handleImageClick={handleOpenModal}
          />
          <SceneModal
            selectedImage={selectedImage}
            onClose={handleCloseModal}
          />
          <SimilarMovieGroup
            mediaType={"tv"}
            movieId={numericTvShowId.toString()}
          />
        </>
      ) : (
        <p>Loading... the single tv show page</p>
      )}
    </div>
  );
};

export default DetailedTvShowPage;
