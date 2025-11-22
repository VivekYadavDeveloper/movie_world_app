
"use client";
import Castings from "@/components/Casting/Casting";
import MediaDetails from "@/components/MediaDetails/MediaDetails";
import SceneGallery from "@/components/SceneGallery/SceneGallery";
import SceneModal from "@/components/SceneModal/SceneModal";
import SimilarMovieGroup from "@/components/SimilarMovieGroup/SimilarMovieGroup";
import Trailers from "@/components/Trailers/Trailers";
import { Credits } from "@/type/CreditsType";
import { ImageDetails } from "@/type/SceneType";
import { SingleMovie } from "@/type/SingleMovieType";
import { VideoData } from "@/type/YoutubeType";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "b63e955afbf443c9323b45b9c81c3d68";

const DetailedMoviePage = () => {
  const [movie, setMovie] = useState<SingleMovie | null>(null);
  const [youtubeData, setYoutubeData] = useState<VideoData[] | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null); // For movie credits
  const [sceneImages, setSceneImages] = useState<ImageDetails[]>([]); // For movie scene images
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // For the selected scene image
  
  
  const pathname = usePathname();
  const lastPartOfPath = pathname?.split("/movies/")[1];
  const numericMovieId = Number(lastPartOfPath);


  /* Fetch Movie Details */

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/movie/${numericMovieId}?api_key=${API_KEY}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        console.log(`Fetch Movie Data:, ${data.response}`);
        setMovie(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchMovieData();
  }, [numericMovieId]);

  /* Fetch Video */

  useEffect(() => {
    const fetchYoutubeData = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/movie/${numericMovieId}/videos?api_key=${API_KEY}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        console.log(`Fetch Youtube Data:, ${data.response}`);
        setYoutubeData(data.results.slice(0, 6));
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchYoutubeData();
  }, [numericMovieId]);

  /* Fetch Actors Names */

  useEffect(() => {
    const fetchMovieCredits = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/movie/${numericMovieId}/credits?api_key=${API_KEY}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        console.log(`Fetch Movie Credit:, ${data.response}`);
        setCredits(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchMovieCredits();
  }, [numericMovieId]);

  /* Fetch Movie Images */

  useEffect(() => {
    const fetchMovieImages = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/movie/${numericMovieId}/images?api_key=${API_KEY}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        console.log(`Fetch Movie Images:, ${data.response}`);
        setSceneImages(data.backdrops.slice(0, 6));
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchMovieImages();
  }, [numericMovieId]);

  const genreNames: string = movie?.genres
    ? movie?.genres.map((genre: { name: string }) => genre.name).join(", ")
    : '';

  // Filter out crew members who are not involved in Acting

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
            mediaType={"movie"}
            movieId={numericMovieId.toString()}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DetailedMoviePage;
