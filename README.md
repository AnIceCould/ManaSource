# PicClean

PicClean 是一款面向二次元图片管理的桌面工具，采用前后端分离架构，通过浏览器界面浏览、本地图片收藏。

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

## 项目结构

```
PicClean/
├── backend/
│   ├── main.py                 # FastAPI 入口，CORS 中间件配置
│   ├── requirements.txt        # Python 依赖
│   └── app/
│       ├── __init__.py
│       ├── models.py           # Pydantic 数据模型
│       ├── routes.py           # REST API 路由定义
│       └── services.py         # 业务逻辑（扫描、缩略图、磁盘缓存）
│
└── frontend/
    ├── index.html              # HTML 入口
    ├── package.json            # Node.js 依赖和启动脚本
    ├── vite.config.js         # Vite 构建配置和 API 代理
    └── src/
        ├── main.jsx           # React 入口
        ├── App.jsx           # 根组件，状态管理
        ├── App.css           # 全局样式
        ├── api/
        │   └── index.js      # API 调用封装
        └── components/
            ├── FolderSelector.jsx   # 文件夹路径输入表单
            ├── ImageGrid.jsx        # 缩略图网格容器
            ├── ImageCard.jsx        # 单张缩略图卡片
            ├── PreviewPanel.jsx     # 右侧原图预览面板
            └── StatusBar.jsx        # 底部状态栏
```

## 环境要求

- Python 3.11 或更高版本
- Node.js 18 或更高版本（LTS 推荐）
- npm 9 或更高版本（随 Node.js 自带）

## 快速开始

### 1. 克隆仓库

```bash
git clone https://github.com/your-username/PicClean.git
cd PicClean
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

## API 文档

### `GET /api/scan`

递归扫描指定目录下的所有图片文件。

| 参数   | 类型   | 必填 | 说明             |
| ------ | ------ | ---- | ---------------- |
| folder | string | 是   | 文件夹的绝对路径 |

**响应示例** (`application/json`):

```json
{
  "folder": "C:\\Users\\Pictures",
  "images": [
    {
      "path": "C:\\Users\\Pictures\\artwork.png",
      "name": "artwork.png",
      "size": 245760
    }
  ],
  "total": 1
}
```

### `GET /api/thumbnail`

获取指定图片的缩略图（优先返回缓存）。

| 参数 | 类型   | 必填 | 说明           |
| ---- | ------ | ---- | -------------- |
| path | string | 是   | 图片文件的绝对路径 |

**响应**: `image/png` 二进制流（280x280）。

### `GET /api/image`

获取指定图片的原图。

| 参数 | 类型   | 必填 | 说明           |
| ---- | ------ | ---- | -------------- |
| path | string | 是   | 图片文件的绝对路径 |

**响应**: `image/png` 二进制流。

## 工作机制

开发阶段，Vite 内置代理将所有 `/api` 请求转发至 FastAPI 后端，避免跨域问题。后端同时配置了 CORS 中间件作为生产环境兜底。

缩略图生成后以原图路径的 MD5 哈希值命名，存储于 `~/.picclean_cache/` 目录。后续请求同名图片时直接读取缓存文件，无需重复处理。

## License

MIT
