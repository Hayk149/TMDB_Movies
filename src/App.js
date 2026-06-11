import React, {use, useState, useEffect} from 'react';
import MovieCard from '../src/components/MovieCard'
import {useMovies} from '../src/hooks/useMovies'
import './App.css';

function App() {

  const { movies, loading, error, loadPopular, search } = useMovies()

  const [myList, setMyList] = useState([])

  useEffect (()=>{
    loadPopular()
  }, [])

  useEffect (()=>{
    const saved = localStorage.getItem('myMovies')
    if(saved) {
      setMyList(JSON.parse(saved))
    }
  }, [])

  const addToList = (movie) => {
    setMyList(prev => {
      if(prev.find(m => m.id === movie.id)) {
        return prev
      }
      const newList = [...prev, movie]
      localStorage.setItem('myMovies', JSON.stringify(newList))
      return newList
    })
  }

  const removeFromList = (id) => {
  setMyList(prev => {
    const newList = prev.filter(m => m.id !== id)
    localStorage.setItem('myMovies', JSON.stringify(newList))
    return newList
  })
}

  const isInList = (id) => {
    return myList.some(m=>m.id===id)
  }

  if (loading) {
    return (
      <div style={styles.center}>
        <h2>Загрузка фильмов...</h2>
      </div>
    )
  }

  if (error) {
    return (
      <div style={styles.center}>
        <h2 style={{color: 'red'}}>{error}</h2>
        <button onClick={loadPopular} style={styles.retryBtn}>Попробовать снова</button>
      </div>
    )
  }


  return (
    <div style={{padding: '20px', background: 'f5f5f5', minHeight: '100vh'}}>
      <h1 style={{textAlign: 'center', marginBottom: '30px'}}>🎬 Моя коллекция фильмов</h1>
      <div style={{display: 'grid', gap: '25px', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', maxWidth: '1200px', margin: '0 auto'}}>
        {movies.map(movie=>(
          <MovieCard
            key={movie.id}
            movie={movie}
            onAddToList={movie => {
              if (isInList(movie.id)) removeFromList(movie.id)
              else addToList(movie)
            }}
            isInList={isInList(movie.id)}
          />
            ))}
      </div>
    </div>
  );
}

const styles = {
  center: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: '#f5f5f5'
  },
  retryBtn: {
    marginTop: '20px',
    padding: '10px 20px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px'
  }
}

export default App;
