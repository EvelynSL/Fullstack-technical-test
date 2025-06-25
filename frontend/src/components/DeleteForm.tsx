interface DeleteFormProps {
	onDelete?: () => void | Promise<void>
	fetching?: boolean
	onClose?: () => void
}

export function DeleteForm({ onDelete, fetching, onClose }: DeleteFormProps) {
	const handleClose = () => {
		onClose?.()
	}

    const handleDelete = async () => {
        try {
          await onDelete?.();
        } catch (err) {
          console.error("Error deleting", err);
        }
      };
    

	return (
		<div className='flex justify-end space-x-2 pt-2'>
			<button
				type='button'
				onClick={handleClose}
                disabled={fetching}
				className='bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition'
			>
				Cancel
			</button>
			<button
				type='submit'
                disabled={fetching}
				className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-500 transition border-none focus:outline-none'
                onClick={handleDelete}
			>
				Delete
			</button>
		</div>
	)
}
