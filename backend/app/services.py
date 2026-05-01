import os
import hashlib
from pathlib import Path
from io import BytesIO

from PIL import Image

SUPPORTED_FORMATS = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".tiff", ".tif"}
THUMBNAIL_SIZE = (280, 280)
CACHE_DIR = Path.home() / ".picclean_cache"


def is_image_file(file_path: str) -> bool:
    ext = os.path.splitext(file_path)[1].lower()
    return ext in SUPPORTED_FORMATS


def scan_folder(folder_path: str) -> list[dict]:
    images: list[dict] = []
    for root, dirs, files in os.walk(folder_path):
        dirs[:] = [d for d in dirs if not d.startswith(".")]
        for f in files:
            full_path = os.path.join(root, f)
            if is_image_file(full_path):
                try:
                    stat = os.stat(full_path)
                except OSError:
                    continue
                images.append({
                    "path": full_path,
                    "name": f,
                    "size": stat.st_size,
                })
    return images


def generate_thumbnail(image_path: str) -> bytes:
    cache_path = _cache_path(image_path)
    if cache_path.exists():
        return cache_path.read_bytes()

    img = Image.open(image_path)
    img = img.convert("RGBA")
    img.thumbnail(THUMBNAIL_SIZE, Image.LANCZOS)

    background = Image.new("RGBA", THUMBNAIL_SIZE, (245, 245, 245, 255))
    offset = (
        (THUMBNAIL_SIZE[0] - img.width) // 2,
        (THUMBNAIL_SIZE[1] - img.height) // 2,
    )
    background.paste(img, offset, img if img.mode == "RGBA" else None)

    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    buf = BytesIO()
    background.save(buf, format="PNG")
    data = buf.getvalue()

    cache_path.write_bytes(data)
    return data


def get_full_image(image_path: str) -> BytesIO:
    img = Image.open(image_path)
    img = img.convert("RGBA")
    buf = BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)
    return buf


def _cache_path(image_path: str) -> Path:
    hash_hex = hashlib.md5(image_path.encode()).hexdigest()
    return CACHE_DIR / f"{hash_hex}.png"
