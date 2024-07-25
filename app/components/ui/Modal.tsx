import { cn } from '@/lib/utils';
import { FC, HtmlHTMLAttributes, useEffect, useRef } from 'react';
import { Container } from './Container';

interface ModalProps extends HtmlHTMLAttributes<HTMLDivElement> {
	open: boolean;
	setOpen?: Function;
	onClose?: Function;
}

const Modal: FC<ModalProps> = ({ open, setOpen, onClose, children, className }) => {
	const modalRef = useRef<HTMLDivElement>(null);

	const handleDialogClick = (e: any) => {
		if (open && !modalRef.current?.contains(e.target) && !modalRef.current?.contains(e.target)) {
			onClose != undefined && onClose();

			setOpen != undefined && setOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mouseup', handleDialogClick);
	});

	return (
		<section
			className={`${
				!open ? 'w-0 h-0' : 'w-full h-full'
			} fixed top-0 left-0 z-20 bg-neutral-200/10 flex items-center justify-center overflow-auto`}
		>
			{
				<Container ref={modalRef} className={cn('', className)}>
					{children}
				</Container>
			}
		</section>
	);
};

export default Modal;
