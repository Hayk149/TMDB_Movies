import { use, useState } from "react";
import { getPopularMovies, searchMovies } from '../services/tmdb'

export const useMovies = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const loadPopular = async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await getPopularMovies()
            setMovies(data)
        }
        catch(err) {
            setError('капец не получилось')
            console.error(err)
        }
        finally {
            setLoading(false)
        }
    }
    
    const search = async (query) => {
        if (!query.trim()) {
            await loadPopular()
            return
        }

        setLoading(true)
        setError(null)
        try {
            const data = await searchMovies(query)
            setMovies(data)
        }

        catch (err) {
            setError('Ошибка поиска')
            console.error(err)
        }

        finally {
            setLoading(false)
        }
    }

  return { movies, loading, error, loadPopular, search }

}