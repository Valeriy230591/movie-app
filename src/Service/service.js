export const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };
  export const getColorByRating = (rating) => {
    if (rating >= 0 && rating < 3) {
      return "#E90000";
    } else if (rating >= 3 && rating < 5) {
      return "#E97E00";
    } else if (rating >= 5 && rating < 7) {
      return "#E9D100";
    } else {
      return "#66E900";
    }
  };
  export const getGenresByIds = (genreIds, genresList) => {
    if (!Array.isArray(genreIds) || !Array.isArray(genresList)) {
      return [];
    }
    
    return genreIds.map(genreId => {
      const genre = genresList.find(genre => genre.id === genreId);
      return genre ? genre.name : null;
    }).filter(genre => genre !== null);
  };