import { cn } from '@/lib/utils';
import { FC, HtmlHTMLAttributes, useEffect, useRef } from 'react';

interface ModalProps extends HtmlHTMLAttributes<HTMLDivElement> {
	visible: boolean;
	clickOut?: boolean;
	closeModal: Function;
}

const Modal: FC<ModalProps> = ({ children, visible, closeModal, clickOut, className }) => {
	const modalRef = useRef<HTMLDivElement>(null);

	const handleDialogClick = (e: any) => {
		if (clickOut !== true) return;
		if (visible && !modalRef.current?.contains(e.target) && !modalRef.current?.contains(e.target)) {
			closeModal(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mouseup', handleDialogClick);
	});

	return (
		<section
			className={`${
				!visible ? 'w-0 h-0' : 'w-full h-full'
			} fixed top-0 left-0 z-20 bg-slate-600/30 flex items-center justify-center overflow-auto`}
		>
			{
				<div
					ref={modalRef}
					className={cn(
						`bg-slate-200 dark:bg-slate-600 border-slate-400 dark:border-slate-800 border-2 rounded p-4 ${className}`
					)}
				>
					{children}
				</div>
			}
		</section>
	);
};

export default Modal;
