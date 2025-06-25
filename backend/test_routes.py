from fastapi.testclient import TestClient
from routes import router, items
from main import app


client = TestClient(app)

def setup_function():
    # Reset the items list before each test
    items.clear()

def test_get_items():
    response = client.get("/items")
    assert response.status_code == 200
    assert response.json() == items