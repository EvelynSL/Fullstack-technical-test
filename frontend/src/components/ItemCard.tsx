import { useState } from 'react'
import type { Item } from '../lib/utils'
import { Modal } from './common/Modal'
import { ItemForm } from './ItemForm'
import { DeleteForm } from './DeleteForm'
import { useMutation } from '@tanstack/react-query'
import { deleteItem } from '../api/items'
import queryClient from '../queryClient'
import { toast } from 'sonner'

export const ProductCard = ({ item }: { item: Item }) => {
	const [selectedItem, setSelectedItem] = useState<Item | null>(null)
	const [isOpen, setIsOpen] = useState(false)
	const [isOpenDelete, setIsOpenDelete] = useState(false)

	const deleteMutation = useMutation({
		mutationFn: (id: number) => deleteItem(id),
		onSuccess: () => {
		  queryClient.invalidateQueries({ queryKey: ["items"] });
		  toast.success("Item deleted successfully");
		  setIsOpenDelete(false);
		},
		onError: () => {
		  toast.error("Failed to delete item");
		},
	  });
	  

	const handleEditClick = () => {
		setSelectedItem(item)
		setIsOpen(true)
	}

	const handleDeleteClick = () => {
		setSelectedItem(item)
		setIsOpenDelete(true)
	}

	const handleDelete = async () => {
		if (selectedItem) {
			await deleteMutation.mutateAsync(selectedItem.id)
		}
	}

	return (
		<div className='bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 relative'>
			<div className='absolute top-2 right-2 flex gap-2'>
				<button
					className='text-gray-600 bg-transparent p-1 hover:bg-none border-none focus:outline-none'
					onClick={handleEditClick}
				>
					<img src='/public/icons/edit.svg' width='20' />
				</button>
				<button
					className='text-gray-600 bg-transparent p-1 hover:bg-none border-none focus:outline-none'
					onClick={handleDeleteClick}
				>
					<img src='/public/icons/trash.svg' width='20' />
				</button>
				<Modal
					isOpen={isOpen}
					onClose={() => setIsOpen(false)}
					title='Edit Item'
				>
					<ItemForm
						onClose={() => setIsOpen(false)}
						selectedItem={selectedItem}
					/>
				</Modal>

				<Modal
					isOpen={isOpenDelete}
					onClose={() => setIsOpenDelete(false)}
					title='Are you sure you want to delete this item?'
				>
				<DeleteForm onClose={() => setIsOpenDelete(false)} onDelete={handleDelete} fetching={deleteMutation.isPending}/>
				</Modal>
			</div>
			<div className='p-6'>
				<div className='flex justify-between items-start mb-4'>
					<div className='flex-1'>
						<h3 className='text-xl font-medium text-gray-900 mb-2'>
							{item.name}
						</h3>
						<p className='text-gray-600 text-sm leading-relaxed'>
							{item.description}
						</p>
					</div>
				</div>

				<div className='flex justify-between items-center'>
					<span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800'>
						{item.category}
					</span>
					<span className='text-2xl font-semibold text-gray-900'>
						${item.price.toFixed(2)}
					</span>
				</div>
			</div>
		</div>
	)
}
