import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from fastapi import FastAPI
from routes import router

app = FastAPI()
app.include_router(router)

client = TestClient(app)

@pytest.fixture
def sample_item_create():
    return {
        "name": "Test Item",
        "description": "A test item description",
        "price": 99.99,
        "category": "Electronics"
    }

@pytest.fixture
def sample_item_response():
    return {
        "id": 1,
        "name": "Test Item",
        "description": "A test item description",
        "price": 99.99,
        "category": "Electronics"
    }

@pytest.fixture
def sample_item_update():
    return {
        "name": "Updated Item",
        "price": 149.99
    }

class TestCreateItem:
    def test_create_item_invalid_data(self):
        invalid_data = {
            "name": "",  
            "price": -10
        }
        
        response = client.post("/items", json=invalid_data)
        
        assert response.status_code == 422
    
    def test_create_item_missing_fields(self):
        incomplete_data = {
            "name": "Test Item"
        }
        
        response = client.post("/items", json=incomplete_data)
        
        assert response.status_code == 422

class TestUpdateItem:        
    @patch('routes.update_item')
    def test_update_item_not_found(self, mock_update_item, sample_item_update):
        item_id = 999
        
        mock_update_item.return_value = None
        
        response = client.put(f"/items/{item_id}", json=sample_item_update)
        
        assert response.status_code == 404
        data = response.json()
        assert data["detail"] == f"Item with id {item_id} not found"
    
    def test_update_item_invalid_id(self, sample_item_update):
        invalid_id = "invalid_id"
        
        response = client.put(f"/items/{invalid_id}", json=sample_item_update)
        
        assert response.status_code == 422
    
    @patch('routes.update_item')
    def test_update_item_partial_update(self, mock_update_item, sample_item_response):
        item_id = 1
        partial_update = {"price": 199.99}
        updated_item = {**sample_item_response, "price": 199.99}
        
        mock_update_item.return_value = updated_item
        
        response = client.put(f"/items/{item_id}", json=partial_update)
        
        assert response.status_code == 200
        data = response.json()
        assert data["item"]["price"] == 199.99
    
    def test_update_item_empty_data(self):
        item_id = 1
        empty_data = {}
        
        response = client.put(f"/items/{item_id}", json=empty_data)
        
        assert response.status_code in [200, 422]