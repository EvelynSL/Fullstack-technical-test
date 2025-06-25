from fastapi import APIRouter, HTTPException, status
from typing import List
from schemas import Item, ItemCreate, ItemUpdate, ItemsResponse, ItemResponse
from services import get_item_by_id, add_item, remove_item, update_item_by_id, get_all_items

router = APIRouter(
    tags=["Items"],
)

@router.get("/")
def welcome():
    return {
        "message": "Welcome to our API!",
        "status": "active",
        "version": "1.0.0",
    }

@router.get("/items", response_model=ItemsResponse)
def get_items():

    items = get_all_items()

    return {
        "success": True,
        "message": "Items have been retrieved successfully",
        "items": items,
    }

@router.get("/items/{item_id}", response_model=ItemResponse)
def get_item(item_id: int):
    item = get_item_by_id(item_id)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Item with id {item_id} not found"
        )
    return {
        "success": True,
        "message": f"Item with id {item_id} has been retrieved successfully",
        "item": item,
    }

@router.post("/items", response_model=ItemResponse, status_code=status.HTTP_201_CREATED)
def create_item(item: ItemCreate):
    new_item = add_item(item.name, item.description, item.price, item.category)
    
    if not new_item:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to create item"
        )

    return {
        "success": True,
        "message": "Item has been created successfully",
        "item": new_item,
    }

@router.put("/items/{item_id}", response_model=ItemResponse)
def update_item(item_id: int, item_update: ItemUpdate):
    item = update_item_by_id(item_id, item_update.dict(exclude_unset=True))

    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Item with id {item_id} not found"
        )
    
    return {
        "success": item is not None,
        "message": f"Item with id {item_id} has been updated successfully",
        "item": item if item else None,
    }

@router.delete("/items/{item_id}")
def delete_item(item_id: int):
    
    response = remove_item(item_id)
    
    return {
        "success": response,
        "message": f"Item with id {item_id} has been deleted successfully",
    }
