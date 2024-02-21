import { FC } from 'react';
import { Button } from './Button';

interface DialogProps {
	message: string;
	name: string;
	onDialog: Function;
}

const Dialog: FC<DialogProps> = ({ message, name, onDialog }) => {
	return (
		<div>
			<Button onClick={() => onDialog(false)}>Close</Button>
			<Button onClick={() => onDialog(true)}>Yuh</Button>
		</div>
	);
};

export default Dialog;
