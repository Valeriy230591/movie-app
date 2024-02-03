import React, { useState, useEffect } from "react";
import { useData } from "../DataContext/DataContext";

import Card from "../Card/Card";
import style from "./RateList.module.css";

const RateList = () => {
  const { movieRatings } = useData();
  const [movieDataArray, setMovieDataArray] = useState([]);

  useEffect(() => {
    const storedRatings = JSON.parse(localStorage.getItem("movieRatings"));
    if (storedRatings) {
      setMovieDataArray(Object.values(storedRatings));
    }
  }, []);
  if (!movieDataArray || movieDataArray.length === 0) {
    return <div>No movies rated yet.</div>;
  }

  return (
    <div>
      <ul className={style.movielist}>
        {movieDataArray.map((movie) => (
          <Card rating={movie.rating} movie={movie} key={movie.id} />
        ))}
      </ul>
    </div>
  );
};

export default RateList;
