const useGenre = (selectedGenres) => {
    if (!selectedGenres || selectedGenres.length < 1) return "";
    
    const genreIds = selectedGenres.map((genre) => genre.id);
    return genreIds.join(","); // More readable than reduce
  };
  
  export default useGenre;