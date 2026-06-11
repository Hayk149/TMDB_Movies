import React, {use, useState, useEffect} from 'react';
import MovieCard from '../src/components/MovieCard'
import './App.css';

function App() {

  const [movies] = useState([
    {
      id: 1,
      title: 'Начало',
      poster_path: null,
      release_date:'2010-07-16',
      vote_average: 8.8
    },
    {
      id: 2,
      title: 'Матрица',
      poster_path: null,
      release_date: '1999-03-31',
      vote_average: 8.7
    },
    {
      id: 3,
      title: 'Зелёная книга',
      poster_path: null,
      release_date: '2018-11-16',
      vote_average: 8.5
    }
  ])

  const [myList, setMyList] = useState([])

  useEffect (()=>{
    const saved = localStorage.getItem('myMovies')

    if(saved) {
      setMyList(JSON.parse(saved))
    }
  }, [])

  useEffect (()=>{
    localStorage.setItem('myMovies', JSON.stringify(myList))
  }, [myList])

  const addToList = (movie) => {
    setMyList(prev => {
      if(prev.find(m => m.id === movie.id)) {
        return prev
      }
      return [...prev, movie]
    })
  }

  const removeFromList = (id) => {
    setMyList(prev => prev.filter(m => m.id !== id))
  }

  const isInList = (id) => {
    return myList.some(m=>m.id===id)
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

export default App;
