import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import "../routes/Detail_module.css";

interface MovieType {
  id:number;
  medium_cover_image:string;
  title:string;
  year:string;
  rating:string;
  genres:string[];
}

function Detail() {
  const [star, setStar] = useState<boolean[]>([false, false, false, false, false]);
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [movie, setMovie] = useState({} as MovieType);

  const getMovie:()=>void = async () => {
    const json:any = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };

  useEffect(() => getMovie(), []);
  return (
    <div className="detail">
      {loading ? (
        <h1 className="detail__loader">Loading...</h1>
      ) : (
        <div className="detail__movie" key={movie.id}>
          <div className="detail__box">
            <img className="detail__poster" src={movie.medium_cover_image} alt=''/>
            <div className="detail__text">
              <h3 className="detail__title">{movie.title}</h3>
              <h6 className="detail__year">({movie.year})</h6>
            </div>
            <div className="detail__rating">
              <div>
                {movie.rating >= "9" ? (
                  <div>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                  </div>
                ) : null}
                {movie.rating >= "8" && movie.rating < "9" ? (
                  <div>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-line "></i>
                  </div>
                ) : null}
                {movie.rating >= "7" && movie.rating < "8" ? (
                  <div>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-line "></i>
                    <i className="ri-star-line "></i>
                  </div>
                ) : null}
              </div>
              <h6>({movie.rating})</h6>
            </div>
            <div className="detail__list">
              <ul className="detail__genres">
                {movie.genres.map((g) => (
                  <li>{g}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
