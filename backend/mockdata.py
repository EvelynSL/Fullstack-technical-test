items = [
    {"id": 1, "name": "Laptop", "description": "High-end gaming laptop", "price": 1500.00, "category": "Electronics"},
    {"id": 2, "name": "Mouse", "description": "Ergonomic wireless mouse", "price": 25.99, "category": "Accessories"},
    {"id": 3, "name": "Keyboard", "description": "Mechanical RGB keyboard", "price": 89.99, "category": "Accessories"},
]

next_id = 4

def get_next_id():
    global next_id
    current_id = next_id
    next_id += 1
    return current_id
