# ManaSource

ManaSource 是一款面向二次元图片管理的桌面工具，采用前后端分离架构，通过浏览器界面浏览、本地图片收藏。

## 功能特性

- **文件夹扫描** -- 递归扫描指定目录，实时显示扫描进度
- **缩略图网格** -- CSS Grid 响应式布局，随窗口宽度自动调整列数
- **图片预览** -- 点击缩略图后在侧边面板展示原图
- **缩略图缓存** -- 已生成的缩略图缓存至本地磁盘，二次访问无需重复处理
- **多格式支持** -- JPG、JPEG、PNG、GIF、WebP、BMP、TIFF

## 技术栈

| 层级   | 技术选型                              |
| ------ | ------------------------------------ |
| 前端   | React 18、Vite、CSS Grid             |
| 后端   | Python 3.11+、FastAPI、Uvicorn       |
| 图像处理 | Pillow (PIL)                        |

## 环境要求

- Python 3.11 或更高版本
- Node.js 18 或更高版本
- npm 9 或更高版本

## 快速开始

### 1. 克隆仓库

```bash
git clone https://github.com/your-username/ManaSource.git
cd ManaSource
```

### 2. 启动后端服务

```bash
cd backend
pip install -r requirements.txt
python main.py
```

后端服务启动于 `http://127.0.0.1:8000`。

### 3. 启动前端服务

在新的终端窗口中执行：

```bash
cd frontend
npm install
npm run dev
```

前端开发服务器启动于 `http://localhost:5173`。

### 4. 访问应用

在浏览器中打开 `http://localhost:5173`，输入文件夹路径后点击"扫描文件夹"即可开始使用。
