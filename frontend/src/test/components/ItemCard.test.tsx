/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ItemCard } from '../../components/ItemCard'
import type { Item } from '../../lib/utils'

// Mock dependencies
vi.mock('../api/items')
vi.mock('sonner')
vi.mock('../queryClient', () => ({
  default: {
    invalidateQueries: vi.fn()
  }
}))

// Mock child components
vi.mock('./common/Modal', () => ({
  Modal: ({ children, isOpen, title, onClose }: any) => 
    isOpen ? (
      <div data-testid="modal">
        <div data-testid="modal-title">{title}</div>
        <button data-testid="modal-close" onClick={onClose}>Close</button>
        {children}
      </div>
    ) : null
}))

vi.mock('./ItemForm', () => ({
  ItemForm: ({ onClose, selectedItem }: any) => (
    <div data-testid="item-form">
      <span data-testid="selected-item-id">{selectedItem?.id}</span>
      <button data-testid="item-form-close" onClick={onClose}>Close Form</button>
    </div>
  )
}))

vi.mock('./DeleteForm', () => ({
  DeleteForm: ({ onClose, onDelete, fetching }: any) => (
    <div data-testid="delete-form">
      <button data-testid="delete-form-close" onClick={onClose}>Cancel</button>
      <button data-testid="delete-form-confirm" onClick={onDelete} disabled={fetching}>
        {fetching ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  )
}))

const mockItem: Item = {
  id: 1,
  name: 'Test Product',
  description: 'This is a test product description',
  category: 'Electronics',
  price: 99.99
}

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  })
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('ItemCard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders product information correctly', () => {
    render(<ItemCard item={mockItem} />, { wrapper: createWrapper() })

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('This is a test product description')).toBeInTheDocument()
    expect(screen.getByText('Electronics')).toBeInTheDocument()
    expect(screen.getByText('$99.99')).toBeInTheDocument()
  })

  it('formats price correctly with two decimal places', () => {
    const itemWithDifferentPrice: Item = {
      ...mockItem,
      price: 123.5
    }

    render(<ItemCard item={itemWithDifferentPrice} />, { wrapper: createWrapper() })

    expect(screen.getByText('$123.50')).toBeInTheDocument()
  })

  it('handles item with no description', () => {
    const itemWithoutDescription: Item = {
      ...mockItem,
      description: ''
    }

    render(<ItemCard item={itemWithoutDescription} />, { wrapper: createWrapper() })

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('Electronics')).toBeInTheDocument()
    expect(screen.getByText('$99.99')).toBeInTheDocument()
  })

})