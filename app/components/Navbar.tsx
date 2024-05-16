import { Button } from '@/ui/Button';
import Paragraph from './ui/Paragraph';
import Link from 'next/link';

export default function Navbar() {
	return (
		<nav className="h-16 backdrop-blur border-b border-neutral-800 w-full flex items-center justify-center">
			<div className="max-w-5xl w-full flex justify-center ">
				<Paragraph size={'xs'} className="text-neutral-600 absolute left-4">
					𝓯𝓻𝓮𝓪𝓴𝔂 Scout
				</Paragraph>
				<Link href={'/backpack'} className="text-neutral-600 hover:underline">
					Goto Backpack
				</Link>
			</div>
		</nav>
	);
}
