import ImageCard from './ImageCard'

export default function ImageGrid({ images, selectedPath, onSelect }) {
  if (images.length === 0) {
    return (
      <div className="image-grid-empty">
        <p>暂无图片，请先扫描文件夹</p>
      </div>
    )
  }

  return (
    <div className="image-grid">
      {images.map((img) => (
        <ImageCard
          key={img.path}
          image={img}
          isSelected={selectedPath === img.path}
          onClick={onSelect}
        />
      ))}
    </div>
  )
}
