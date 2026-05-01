import { getFullImageUrl } from '../api'

export default function PreviewPanel({ image }) {
  if (!image) {
    return (
      <div className="preview-panel empty">
        <span>选择一张图片预览</span>
      </div>
    )
  }

  return (
    <div className="preview-panel">
      <img
        src={getFullImageUrl(image.path)}
        alt={image.name}
        className="preview-image"
      />
      <div className="preview-info">
        <p className="preview-name">{image.name}</p>
        <p className="preview-size">{(image.size / 1024).toFixed(1)} KB</p>
      </div>
    </div>
  )
}
