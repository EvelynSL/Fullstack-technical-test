from pydantic import BaseModel, Field
from typing import Optional


class ItemCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    price: float = Field(..., gt=0)
    category: str = Field(..., min_length=1, max_length=50)


class ItemUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    price: Optional[float] = Field(None, gt=0)
    category: Optional[str] = Field(None, min_length=1, max_length=50)


class Item(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: float
    category: str

class ItemResponse(BaseModel):
    success: bool
    message: str
    item: Item

class ItemsResponse(BaseModel):
    success: bool
    message: str
    items: list[Item]