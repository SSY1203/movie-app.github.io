import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../components/Movie_module.css";

function Movie({ id, img, year, title, summary, genres }) {
  return (
    <div id className="movie-box">
      <img src={img} alt={title} />
      <div className="movie-detail">
        <h2>
          <Link className="movie__title" to={`/movie/${id}`}>
            {title}
          </Link>
        </h2>
        <h4 className="movie__year">{year}</h4>
        <p className="movie__summary">
          {summary.length > 235 ? `${summary.slice(0, 235)}...` : summary}
        </p>
        <ul className="movie__genres">
          {genres.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
