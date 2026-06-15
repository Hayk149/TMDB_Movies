import React, {use, useState, useEffect} from 'react';
import MovieCard from '../src/components/MovieCard'
import {useMovies} from '../src/hooks/useMovies'
import './App.css';

function App() {

  const { movies, loading, error, loadPopular, search } = useMovies()

  const [myList, setMyList] = useState([])

  const [activeTab, setActiveTab ] = useState('popular')
  const [searchQuery, setSearchQuery ] = useState('')

  const [sortBy, setSortBy] = useState('')

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

  const handleSearch = () => {
      if (searchQuery.trim()) {
        search(searchQuery)
        setActiveTab('popular')
      }
  }

  const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    handleSearch()
  }
}

   const handleTabChange = (tab) => {
    setActiveTab(tab)
  if (tab === 'popular') {
    loadPopular()
  }
}

const sortMovies = (moviesList) => {
  if (!sortBy) return moviesList

  const sorted = [...moviesList]

  if (sortBy === 'year') {
    return sorted.sort((a, b) => {
      const yearA = a.release_date ? parseInt(a.release_date.split('-')[0]) : 0
      const yearB = b.release_date ? parseInt(b.release_date.split('-')[0]) : 0
      return yearB - yearA
    })
  }

  if (sortBy === 'rating') {
    return sorted.sort((a, b) => {
      const ratingA = a.vote_average || 0
      const ratingB = b.vote_average || 0
      return ratingB - ratingA
    })
  }

  if (sortBy === 'title') {
    return sorted.sort((a, b) => {
      const titleA = a.title || ''
      const titleB = b.title || ''
      return titleA.localeCompare(titleB)
    })
  }

  return sorted
}

const displayedMovies = activeTab === 'popular' ? movies : myList
const sortedMovies = sortMovies(displayedMovies)

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

    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '30px', maxWidth: '1200px', margin: '30px auto'}}>
      <label style={{marginRight: '10px', verticalAlign: 'center'}}>Сортировка по</label>
        <select
          value={sortBy}
          onChange={(e)=>setSortBy(e.target.value)}
          style={styles.sortSelect}>
            <option value=''>По умолчанию</option>
            <option value='year'>По году выпуска</option>
            <option value='rating'>По рейтингу</option>
            <option value='title'>По названию (А-Я)</option>
        </select>

      <input
        type='text'
        placeholder='Поиск фильмов...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        style={styles.searchInput}
        />
      <button style={styles.searchBtn}>🔍 Найти</button>
    </div>

    <div style={styles.tabs}>
      <button onClick={() => handleTabChange('popular')}
          style={{
            ...styles.tabBtn,
            backgroundColor: activeTab === 'popular' ? '#667eea' : 'white',
            color: activeTab === 'popular' ? 'white' : '#333'
          }}>Популярные</button>
      <button
          onClick={() => handleTabChange('my-list')}
          style={{
            ...styles.tabBtn,
            backgroundColor: activeTab === 'my-list' ? '#667eea' : 'white',
            color: activeTab === 'my-list' ? 'white' : '#333'
          }}>Мой список {myList.length}</button>
    </div>

      <div style={{display: 'grid', gap: '25px', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', maxWidth: '1200px', margin: '0 auto'}}>
        {sortedMovies.map(movie=>(
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

    {
      displayedMovies === 0 && (
        <div style={styles.empty}>
          ничо нет крч
        </div>
      )
    }

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
  },
  searchContainer: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    maxWidth: '500px',
    margin: '0 auto 30px auto'
  },
  searchInput: {
    flex: 1,
    padding: '12px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px'
  },
  searchBtn: {
    padding: '12px 24px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  tabs: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '30px'
  },
  tabBtn: {
    padding: '12px 30px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  grid: {
    display: 'grid',
    gap: '25px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  empty: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '18px',
    color: '#666'
  },
  sortSelect: {
  padding: '10px 20px',
  fontSize: '14px',
  borderRadius: '8px',
  border: '2px solid #ddd',
  background: 'white',
  cursor: 'pointer',
  fontWeight: '500'
}
}

/* meow */

export default App;
