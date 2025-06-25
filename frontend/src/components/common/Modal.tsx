interface ModalProps {
	isOpen: boolean
	onClose: () => void
	title?: string
	children: React.ReactNode
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
	if (!isOpen) return null

	return (
		<div className='fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center'>
			<div className='bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative'>
				<div className='flex justify-between items-center mb-4'>
					{title && (
						<h2 className='text-xl font-semibold text-black'>{title}</h2>
					)}
					<button
						onClick={onClose}
						className='text-gray-600 bg-transparent hover:bg-none border-none focus:outline-none'
					>
						<img src='/public/icons/close.svg' />
					</button>
				</div>
				{children}
			</div>
		</div>
	)
}
