
import { useState, useEffect, useRef } from 'react'

const IMAGES = [
  'photo-1500530855697-b586d89ba3ee',
  'photo-1507525428034-b723cf961d3e',
  'photo-1464822759023-fed622ff2c3b',
  'photo-1448375240586-882707db888b',
  'photo-1472120435266-53107fd0c44a',
  'photo-1519501025264-65ba15a82390',
  'photo-1490750967868-88aa4486c946',
  'photo-1518837695005-2083093ee35b',
  'photo-1469854523086-cc02fe5d8800',
  'photo-1511818966892-d7d671e672a2',
  'photo-1474511320723-9a56873867b5',
  'photo-1470770841072-f978cf4d019e',
  'photo-1499346030926-9a72daac6c63',
  'photo-1509316785289-025f5b846b35',
  'photo-1432405972618-c60b0225b8f9',
  'photo-1416879595882-3373a0480b5b',
  'photo-1449824913935-59a10b8d2000',
  'photo-1517299321609-52687d1bc55a',
  'photo-1459262838948-3e2de6c1ec80',
  'photo-1497250681960-ef046c08a56e'
]

const ALL_PHOTOS = IMAGES.map((url, index) => ({
  id: String(index + 1),
  author: `Photo ${index + 1}`,
  url
}))

function PhotoCard({ photo, onLike }) {
  return (
    <div className="photo-card">
      <img
        src={`https://images.unsplash.com/${photo.url}?auto=format&fit=crop&w=900&q=80`}
        alt={photo.author}
        loading="lazy"
        className="photo-image"
      />

      <div className="photo-info">
        <span className="photo-author">{photo.author}</span>

        <button
          className={`like-btn ${photo.likes > 0 ? 'liked' : ''}`}
          onClick={() => onLike(photo.id)}
        >
          👍 {photo.likes}
        </button>
      </div>
    </div>
  )
}

export default function App() {
  const [photos, setPhotos] = useState([])
  const [visibleCount, setVisibleCount] = useState(6)
  const loaderRef = useRef(null)

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem('likedPhotos') || '{}'
    )

    setPhotos(
      ALL_PHOTOS.map(photo => ({
        ...photo,
        likes: saved[photo.id] || 0
      }))
    )
  }, [])

  const loadMore = () => {
    setVisibleCount(prev =>
      Math.min(prev + 4, photos.length)
    )
  }

  useEffect(() => {
    const node = loaderRef.current

    if (!node || visibleCount >= photos.length) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      {
        root: null,
        rootMargin: '300px',
        threshold: 0
      }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [visibleCount, photos.length])

  const handleLike = (id) => {
    setPhotos(prev => {
      const updated = prev.map(photo =>
        photo.id === id
          ? { ...photo, likes: photo.likes + 1 }
          : photo
      )

      const saved = {}

      updated.forEach(photo => {
        saved[photo.id] = photo.likes
      })

      localStorage.setItem(
        'likedPhotos',
        JSON.stringify(saved)
      )

      return updated
    })
  }

  return (
    <div className="app-wrapper">

      <header className="gallery-header">
        <h1>Photo Gallery</h1>
        <p>Infinite scrolling photo gallery</p>
      </header>

      <div className="gallery">
        {photos.slice(0, visibleCount).map(photo => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onLike={handleLike}
          />
        ))}
      </div>

      {visibleCount < photos.length && (
        <div
          ref={loaderRef}
          className="loading-indicator"
        >
          <div className="spinner"></div>
          <span>Scroll to load more photos...</span>

          <button
            className="retry-btn"
            onClick={loadMore}
          >
            Load More
          </button>
        </div>
      )}

      {visibleCount >= photos.length && (
        <div className="end-message">
          You have reached the end of the gallery.
        </div>
      )}

    </div>
  )
}
