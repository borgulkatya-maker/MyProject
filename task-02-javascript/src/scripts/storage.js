const FAVORITES_KEY = 'lapka-favorites';


export const getFavoriteIds = () => {
  const savedFavorites =
    localStorage.getItem(FAVORITES_KEY);

  if (!savedFavorites) {
    return [];
  }

  return JSON.parse(savedFavorites);
};


export const saveFavoriteIds = (favoriteIds) => {
  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(favoriteIds)
  );
};


export const toggleFavorite = (productId) => {
  const favoriteIds = getFavoriteIds();

  const isFavorite =
    favoriteIds.includes(productId);

  let updatedFavorites;


  if (isFavorite) {
    updatedFavorites = favoriteIds.filter(
      (id) => id !== productId
    );
  } else {
    updatedFavorites = [
      ...favoriteIds,
      productId
    ];
  }


  saveFavoriteIds(updatedFavorites);

  return updatedFavorites;
};