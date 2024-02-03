import React, { useState, useEffect } from "react";
import style from "./SearchMovie.module.css";
import MovieList from "../MovieList/MovieList";
import { Flex, Input, Spin, Typography } from "antd";
import { getMoviesInputPagination } from "../API/Api";
import { useData } from "../DataContext/DataContext";
import { debounce } from "lodash";

const { Paragraph } = Typography;

const SearchMovie = () => {
  const { updateMovieRating } = useData();
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState({ results: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [movieNotFound, setMovieNotFound] = useState(false);

  const onInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const delayedSearch = debounce((value) => {
    if (value !== "") {
      setLoading(true);
      getMoviesInputPagination(value, currentPage).then((data) => {
        if (data.results.length === 0) {
          setMovieNotFound(true);
        } else {
          setMovies(data);
          setMovieNotFound(false);
        }
        setLoading(false);
      });
    }
  }, 1000);

  useEffect(() => {
    delayedSearch(searchValue);
  }, [searchValue, currentPage]);

  useEffect(() => {
    const checkNetworkStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", checkNetworkStatus);
    window.addEventListener("offline", checkNetworkStatus);

    return () => {
      window.removeEventListener("online", checkNetworkStatus);
      window.removeEventListener("offline", checkNetworkStatus);
    };
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRateChange = (movieId, rating) => {
    const updatedMovies = movies.results.map((movie) => {
      if (movie.id === movieId) {
        return { ...movie, rating };
      }
      return movie;
    });
    setMovies({ ...movies, results: updatedMovies });

    updateMovieRating({ ...movies, results: updatedMovies });
  };

  return (
    <div>
      <Flex className={style.input__wrapper}>
        <Input
          value={searchValue}
          onChange={onInputChange}
          className={style.input}
        ></Input>
      </Flex>
      {!isOnline ? (
        <div className={style.offline__message}>
          <Paragraph>Отсутствует подключение к сети.</Paragraph>
        </div>
      ) : loading ? (
        <div className={style.spin__wrapper}>
          <Spin size="large" />
        </div>
      ) : movieNotFound ? (
        <div className={style.not__found__message}>
          <Paragraph>Фильм не найден.</Paragraph>
        </div>
      ) : (
        <MovieList
          movies={movies}
          onPageChange={handlePageChange}
          onRateChange={handleRateChange}
        />
      )}
    </div>
  );
};

export default SearchMovie;
