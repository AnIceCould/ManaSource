const API_BASE = '/api'

export async function scanFolder(folderPath) {
  const res = await fetch(`${API_BASE}/scan?folder=${encodeURIComponent(folderPath)}`)
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.detail || '扫描失败')
  }
  return res.json()
}

export function getThumbnailUrl(imagePath) {
  return `${API_BASE}/thumbnail?path=${encodeURIComponent(imagePath)}`
}

export function getFullImageUrl(imagePath) {
  return `${API_BASE}/image?path=${encodeURIComponent(imagePath)}`
}
