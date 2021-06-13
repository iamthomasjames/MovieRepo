import { getAuthToken } from "../settings";

const getApiUrl = async () => {
  let apiUrl = "https://www.omdbapi.com/";
  return apiUrl;
};

const api = {
  async initailLibrary(word) {
    const token = await getAuthToken();
    if (token) {
      const apiUrl = await getApiUrl();
      console.log(`${apiUrl}?s=${word}&apikey=${token}&page=1`)
      return fetch(`${apiUrl}?s=${word}&apikey=${token}&page=1`, {
        method: "GET",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .catch((error) => {
          throw error;
        });
    } else {
      localStorage.clear();
      window.location = "/login";
    }
  },
  async searchResults(search, page, year) {
    const token = await getAuthToken();
    if (token) {
      const apiUrl = await getApiUrl();
      const fetchUrl = `${apiUrl}?s=${search}&apikey=${token}&y=${year}&page=${page}`;
      console.log(fetchUrl);
      return fetch(fetchUrl, {
        method: "GET",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .catch((error) => {
          throw error;
        });
    } else {
      localStorage.clear();
      window.location = "/login";
    }
  },

  async selectedMovie(search) {
    const token = await getAuthToken();
    if (token) {
      const apiUrl = await getApiUrl();
      const fetchUrl = `${apiUrl}?i=${search}&apikey=${token}`;
      return fetch(fetchUrl, {
        method: "GET",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .catch((error) => {
          throw error;
        });
    } else {
      localStorage.clear();
      window.location = "/login";
    }
  },
};

export default api;
