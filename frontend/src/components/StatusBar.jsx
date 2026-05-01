export default function StatusBar({ status, count }) {
  return (
    <div className="status-bar">
      <span className="status-text">{status}</span>
      {count > 0 && <span className="status-count">共 {count} 张图片</span>}
    </div>
  )
}
