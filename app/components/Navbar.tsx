import { Button } from '@/ui/Button';
import Paragraph from './ui/Paragraph';

export default function Navbar() {
	return (
		<nav className="h-16 backdrop-blur border-b border-neutral-800 w-full flex items-center justify-center">
			<div className="max-w-7xl w-full">
				<Paragraph size={'xs'} className="text-neutral-600">
					𝓯𝓻𝓮𝓪𝓴𝔂
				</Paragraph>
			</div>
		</nav>
	);
}
