import axios from "axios";

const apiKey = "edb2db3504c908f426c7404c1da7146a";

export const getInputdata = (searchValue) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchValue}`;
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching data:", error);
      return [];
    });
};

export const getMoviesInputPagination = (searchValue, currentPage) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchValue}&page=${currentPage}`;
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching data:", error);
      return [];
    });
};

const useLocalStorageListener = (callback) => {
  const handleStorageChange = (event) => {
    if (event.key === "movieRatings") {
      const newMovieRatings = JSON.parse(event.newValue);
      callback(newMovieRatings);
    }
  };

  window.addEventListener("storage", handleStorageChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
};
export default useLocalStorageListener;

export const getMovieById = (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching data:", error);
      return null;
    });
};

export const fetchGenres = () => {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
  return axios
    .get(url)
    .then((response) => response.data.genres)
    .catch((error) => {
      console.error("Error fetching data:", error);
      return null;
    });
};
export const createGuestSession = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${apiKey}`
    );
    return response.data.guest_session_id;
  } catch (error) {
    console.error("Error creating guest session:", error);
    return null;
  }
};
