from pydantic import BaseModel


class ImageInfo(BaseModel):
    path: str
    name: str
    size: int


class ScanResult(BaseModel):
    folder: str
    images: list[ImageInfo]
    total: int


class ErrorResponse(BaseModel):
    detail: str
