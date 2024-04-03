'use client';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/Button';
import { usePathname } from 'next/navigation';

const Nav = () => {
	const pathname = usePathname();

	console.log(pathname == '/logbook');
	return (
		<nav className="bg-t-400 h-12 flex justify-center w-full">
			<div className="max-w-6xl flex justify-between items-center w-full px-8">
				<Link href={'/'} className={`hover:text-r-600  ${buttonVariants({ variant: 'link' })}`}>
					L
				</Link>
				<div>
					<Link
						href={'/logbook'}
						className={`hover:text-r-600 ${pathname == '/logbook' ? 'text-r-600' : ''}  ${buttonVariants({
							variant: 'link',
						})}`}
					>
						Logbook
					</Link>
					<Button variant={'link'} className={''}>
						Vault
					</Button>
					<Button variant={'link'} className={''}>
						FAQ
					</Button>
				</div>
			</div>
		</nav>
	);
};

export { Nav };
