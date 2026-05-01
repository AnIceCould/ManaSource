import { useState } from 'react'
import FolderSelector from './components/FolderSelector'
import ImageGrid from './components/ImageGrid'
import PreviewPanel from './components/PreviewPanel'
import StatusBar from './components/StatusBar'
import { scanFolder } from './api'

export default function App() {
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [status, setStatus] = useState('就绪 - 请输入文件夹路径并扫描')
  const [loading, setLoading] = useState(false)
  const [currentFolder, setCurrentFolder] = useState('')

  const handleScan = async (folderPath) => {
    setLoading(true)
    setStatus(`正在扫描: ${folderPath}`)
    setImages([])
    setSelectedImage(null)
    setCurrentFolder(folderPath)

    try {
      const result = await scanFolder(folderPath)
      setImages(result.images)
      setStatus(`扫描完成 - ${result.folder}`)
    } catch (err) {
      setStatus(`错误: ${err.message}`)
      setImages([])
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (image) => {
    setSelectedImage(image)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">ManaSource</h1>
        <span className="app-subtitle">二次元图片管理</span>
      </header>

      <FolderSelector onScan={handleScan} loading={loading} />

      <div className="main-content">
        <div className="grid-panel">
          <ImageGrid
            images={images}
            selectedPath={selectedImage?.path}
            onSelect={handleSelect}
          />
        </div>
        <div className="preview-panel-wrapper">
          <PreviewPanel image={selectedImage} />
        </div>
      </div>

      <StatusBar status={status} count={images.length} />
    </div>
  )
}
