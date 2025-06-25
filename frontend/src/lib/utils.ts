import { z } from "zod"

export interface Item {
  id: number
  name: string
  description: string
  price: number
  category: string
}

export interface ItemResponse {
  item: Item
  success: boolean
  message: string
}

export interface ItemsResponse {
  items: Item[]
  success: boolean
  message: string
}

export const ItemCreateSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Max 3 characters"),
  description: z.string().max(500).optional(),
  price: z.number().gt(0, "Price must be greater than 0"),
  category: z.string().min(1, "Category is required").max(50, "Max 50 characters"),
})

export type ItemCreateInput = z.infer<typeof ItemCreateSchema>

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)


export const inputClass =
"w-full bg-gray-50 text-gray-800 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500";


