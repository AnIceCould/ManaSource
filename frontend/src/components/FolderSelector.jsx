import { useState } from 'react'

export default function FolderSelector({ onScan, loading }) {
  const [folder, setFolder] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = folder.trim()
    if (trimmed) {
      onScan(trimmed)
    }
  }

  return (
    <form className="folder-selector" onSubmit={handleSubmit}>
      <input
        type="text"
        className="folder-input"
        placeholder="输入文件夹路径，例如 C:\Users\Pictures"
        value={folder}
        onChange={(e) => setFolder(e.target.value)}
        disabled={loading}
      />
      <button type="submit" className="scan-btn" disabled={loading || !folder.trim()}>
        {loading ? '扫描中...' : '扫描文件夹'}
      </button>
    </form>
  )
}
