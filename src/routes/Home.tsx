import React, { useEffect, useState } from "react";
import Movie from "../components/Movie.js";
import "../routes/Home_module.css";

export interface MovieType {
  id:number;
  medium_cover_image:string;
  title:string;
  year:string;
  summary:string;
  genres:string[];
}

function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<MovieType[]>([]);

  const getMovies:()=>void = async () => {
    const json:any = await (
      await fetch(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=7&sort_by=year"
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => getMovies(), []);
  return (
    <div className="container">
      {loading ? (
        <h1 className="loader">Loading...</h1>
      ) : (
        <div className="movie">
          {movies.map((movie:MovieType) => (
            <Movie
              key={movie.id}
              id={movie.id}
              img={movie.medium_cover_image}
              title={movie.title}
              year={movie.year}
              summary={movie.summary}
              genres={movie.genres}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
