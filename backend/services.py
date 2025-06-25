from schemas import Item
from typing import Optional
from mockdata import get_next_id, items

def get_item_by_id(item_id: int) -> Optional[Item]:
    for item in items:
        if item["id"] == item_id:
            return item
    return None

def add_item(name, description, price, category):
    global items
    item_id = get_next_id()
    new_item = {
        "id": item_id,
        "name": name,
        "description": description,
        "price": price,
        "category": category
    }
    items.append(new_item)
    return new_item

def remove_item(item_id: int) -> bool:
    global items
    print(f"Removing item with ID: {item_id}")
    item = get_item_by_id(item_id)
    if not item:
        return False
    items = [i for i in items if i["id"] != item_id]
    return True

def update_item_by_id(item_id: int, item_update: dict) -> Optional[Item]:
    item = get_item_by_id(item_id)
    if not item:
        return None
    
    for key, value in item_update.items():
        if value is not None:
            item[key] = value
    
    return item

def get_all_items() -> list[Item]:
    global items
    return items