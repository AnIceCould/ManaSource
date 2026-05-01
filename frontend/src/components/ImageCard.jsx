import { getThumbnailUrl } from '../api'

export default function ImageCard({ image, isSelected, onClick }) {
  return (
    <div
      className={`image-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick(image)}
    >
      <div className="image-card-thumb">
        <img
          src={getThumbnailUrl(image.path)}
          alt={image.name}
          loading="lazy"
        />
      </div>
      <div className="image-card-name" title={image.name}>
        {image.name}
      </div>
    </div>
  )
}
