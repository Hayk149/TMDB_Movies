import axios from "axios";

const API_KEY = '796f289e1402d96f942ce6ba6fb53f2e'
const API_URL = 'https://api.themoviedb.org/3'

export const getPopularMovies = async () => {
  const response = await axios.get(
    `${API_URL}/movie/popular?api_key=${API_KEY}&language=ru-RU`
  )
  return response.data.results
}

export const searchMovies = async (query) => {
  const response = await axios.get(
    `${API_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=ru-RU`
  )
  return response.data.results
}