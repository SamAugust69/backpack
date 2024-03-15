import { FC } from 'react';
import { Button } from './Button';
import Paragraph from './Paragraph';

interface DialogProps {
	title: string;
	desc?: string;
	onContinue: Function
	continueText: string
	closeText: string
	onClose?: Function
}

const Dialog: FC<DialogProps> = ({ title, desc, onContinue, continueText, onClose, closeText }) => {
	return (
		<div className='bg-g-100 border-[3px] border-t-100 w-96 rounded m-2 border-out '>
			<div className='px-4 py-4'>
				<Paragraph className='m-0 text-t-100' size={"sm"}>{title}</Paragraph>
				<Paragraph className='m-0 text-t-200' size={"xs"}>{desc}</Paragraph>
			</div>
			<div className='flex justify-between bg-g-200 px-3 py-2'>
				<Button className={""} onClick={() => {onClose != undefined ? onClose() : null}}>{closeText}</Button>
				<Button className={""} onClick={() => onContinue()}>{continueText}</Button>
			</div>
		</div>
	)
};

export default Dialog;
