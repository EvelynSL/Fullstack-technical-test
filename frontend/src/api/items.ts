import axios from 'axios'
import type { Item, ItemResponse, ItemsResponse } from '../lib/utils'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000',
})

// GET /items
export const getItems = async () => {
  const { data } = await apiClient.get<ItemsResponse>('/items')
  return data.items
}

// GET /items/:id
export const getItemById = async (id: number) => {
  const { data } = await apiClient.get<ItemResponse>(`/items/${id}`)
  return data.item
}

// POST /items
export const createItem = async (item: Omit<Item, 'id'>) => {
  const { data } = await apiClient.post<ItemResponse>('/items', item)
  return data.item
}

// PUT /items/:id
export const updateItem = async (id: number, item: Omit<Item, 'id'>) => {
  const { data } = await apiClient.put<ItemResponse>(`/items/${id}`, item)
  return data.item
}

// DELETE /items/:id
export const deleteItem = async (id: number) => {
  const { data } = await apiClient.delete(`/items/${id}`)
  return data
}
