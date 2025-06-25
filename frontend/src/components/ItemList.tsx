import { useState } from 'react'
import type { Item } from '../lib/utils'
import { Modal } from './common/Modal'
import { ItemForm } from './ItemForm'
import { useQuery } from '@tanstack/react-query'
import { getItems } from '../api/items'
import { ItemCard } from './ItemCard'

export const ItemList = () => {
	const [isOpen, setIsOpen] = useState(false)

	const { data } = useQuery({
		queryKey: ['items'],
		queryFn: getItems,
	})

	return (
		<section className='max-w-6xl mx-auto px-6 py-12'>
			<div className='pb-6 flex justify-end items-center'>
				<button
					onClick={() => setIsOpen(true)}
					className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'
				>
					Add item
				</button>
				<Modal
					isOpen={isOpen}
					onClose={() => setIsOpen(false)}
					title='Add Item'
				>
					<ItemForm onClose={() => setIsOpen(false)} />
				</Modal>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{(data ?? []).map((item: Item) => (
					<ItemCard key={item.id} item={item} />
				))}
			</div>
		</section>
	)
}
