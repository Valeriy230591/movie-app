import React from "react";
import style from "./MovieList.module.css";
import Card from "../Card/Card";

import { Pagination } from "antd";
import { useData } from "../DataContext/DataContext";

const MovieList = ({ movies, onPageChange }) => {
  const { updateMovieRating } = useData();

  const onRateChange = (currentRate, movie) => {
    const storedRatings =
      JSON.parse(localStorage.getItem("movieRatings")) || {};
    storedRatings[movie.id] = { ...movie, rating: currentRate };
    localStorage.setItem("movieRatings", JSON.stringify(storedRatings));
    updateMovieRating(storedRatings);
  };

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <div>
      <ul className={style.movielist}>
        {movies.results.map((movie) => (
          <Card
            onRateChange={(currentRate) => onRateChange(currentRate, movie)} // Пробрасываем колбэк onRateChange
            movie={movie}
            key={movie.id}
          />
        ))}
      </ul>
      <div className={style.pagination__wrapper}>
        <Pagination
          onChange={handlePageChange}
          total={movies.total_pages}
          pageSize={20}
          showSizeChanger={false}
          hideOnSinglePage={true}
        />
      </div>
    </div>
  );
};

export default MovieList;
