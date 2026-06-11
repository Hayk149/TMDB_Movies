import React from 'react'

const MovieCard = ({ movie, onAddToList, isInList }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=Нет+постера'

  const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A'
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : '0'

  return (
    <div style={styles.card}>
      <img
        src={posterUrl}
        alt={movie.title}
        style={styles.poster}
      />
      <div style={styles.info}>
        <h3 style={styles.title}>
            {movie.title}
        </h3>
        <p style={styles.rating}>
            ⭐ {rating} / 10
        </p>
        <p style={styles.year}>
            📅 {year}
        </p>
        <button
            onClick={()=>onAddToList(movie)}
            style={{...styles.button, backgroundColor: isInList ? 'e74c3c' : '667eea'}}>
        {isInList ? '❌ Удалить' : '➕ В мой список'}
        </button>
      </div>
    </div>
  )
}

const styles = {
  card: {
    background: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s',
    cursor: 'pointer',
  },
  poster: {
    width: '100%',
    height: '350px',
    objectFit: 'cover',
  },
  info: {
    padding: '15px',
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '18px',
    marginBottom: '8px',
  },
  rating: {
    color: '#f39c12',
    marginBottom: '5px',
  },
  year: {
    color: '#666',
    fontSize: '14px',
    marginBottom: '10px',
  },
  button: {
    width: '100%',
    padding: '10px',
    border: 'none',
    borderRadius: '6px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
  }
}

export default MovieCard