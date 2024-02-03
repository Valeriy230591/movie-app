import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchGenres } from "../API/Api";
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [movieRatings, setMovieRatings] = useState({});
  const [genresList, setGenreList] = useState([]);
  useEffect(() => {
    fetchGenres().then((genres) => setGenreList(genres));
  }, []);
  const updateMovieRating = (newRatings) => {
    setMovieRatings(newRatings);
    localStorage.setItem("movieRatings", JSON.stringify(newRatings));
  };

  return (
    <DataContext.Provider
      value={{ movieRatings, updateMovieRating, genresList }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
