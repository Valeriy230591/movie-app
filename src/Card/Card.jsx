import React, { useState, useContext } from "react";
import style from "./Card.module.css";
import { Rate } from "antd";
import { truncateText } from "../Service/service";
import { getColorByRating } from "../Service/service";
import { DataContext } from "../DataContext/DataContext";
import { format, parseISO } from "date-fns";
const Card = ({ movie, onRateChange, rating, disableRateChange }) => {
  const [raitingCount, SetRaitingCount] = useState(0);
  const { genresList } = useContext(DataContext);

  const onGetChange = (rate) => {
    if (disableRateChange) return;

    SetRaitingCount(rate);
    if (typeof onRateChange === "function") {
      onRateChange(rate, movie.id);
    }
  };

  const elipsisBorderColor = getColorByRating(Math.round(movie.vote_average));
  const genres = movie.genre_ids
    ? movie.genre_ids.map((genreId) => {
        const genre = genresList.find((genre) => genre.id === genreId);
        return genre ? <span key={genre.id}>{genre.name}</span> : null;
      })
    : null;
  const formatedDates = movie.release_date
    ? format(parseISO(movie.release_date), "MMMM d, yyyy")
    : "no data";
  return (
    <li className={style.movieitem}>
      <div className={style.movieitem__block}>
        <div>
          <img
            className={style.movieitem__img}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={movie.title}
          />
        </div>
        <div className={style.movieitem__info}>
          <div className={style.movieitem__header}>
            <h2 className={style.movieitem__name}>{movie.title}</h2>
            <div
              style={{ borderColor: elipsisBorderColor }}
              className={style.movieitem__elipsis}
            >
              {Math.round(movie.vote_average)}
            </div>
          </div>
          <p>{formatedDates}</p>
          <div className={style.movieitem__genre}>{genres}</div>
          <p className={style.movieitem__overview}>
            {truncateText(movie.overview, 30)}
          </p>
          <div className={style.movieitem__rating}>
            <Rate
              allowHalf
              onChange={onGetChange}
              value={rating ? rating : raitingCount}
              count={10}
              className={style.rate}
              disabled={disableRateChange}
            />
          </div>
        </div>
      </div>
    </li>
  );
};

export default Card;
