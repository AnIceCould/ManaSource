import urllib.parse

from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import StreamingResponse
from io import BytesIO

from app.models import ScanResult, ErrorResponse
from app.services import scan_folder, generate_thumbnail, get_full_image

router = APIRouter()


@router.get("/api/scan", response_model=ScanResult)
def scan(folder: str = Query(..., description="要扫描的文件夹路径")):
    try:
        images = scan_folder(folder)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="文件夹不存在")
    except NotADirectoryError:
        raise HTTPException(status_code=400, detail="路径不是文件夹")
    except PermissionError:
        raise HTTPException(status_code=403, detail="没有访问权限")

    return ScanResult(folder=folder, images=images, total=len(images))


@router.get("/api/thumbnail")
def thumbnail(path: str = Query(..., description="图片路径")):
    try:
        data = generate_thumbnail(path)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="图片文件不存在")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"生成缩略图失败: {str(e)}")

    return StreamingResponse(BytesIO(data), media_type="image/png")


@router.get("/api/image")
def full_image(path: str = Query(..., description="图片路径")):
    try:
        buf = get_full_image(path)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="图片文件不存在")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"加载图片失败: {str(e)}")

    return StreamingResponse(buf, media_type="image/png")
