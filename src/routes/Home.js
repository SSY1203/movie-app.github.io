import React from "react";
import Movie from "../components/Movie.js";
import { useEffect, useState } from "react";
import "../routes/Home_module.css";
function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const json = await (
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
          {movies.map((movie) => (
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
