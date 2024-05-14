'use client';
import { Button } from '@/ui/Button';
import { Container } from '@/components/ui/Container';

export default function Home() {
	return (
		<div className="p-5 flex gap-4">
			<Container variant={'border'} title="Default" className="flex flex-col gap-3 p-3 items-center justify-center">
				<Button size={'sm'}>Default</Button>
				<Button>Default</Button>
				<Button size={'lg'}>Default</Button>
			</Container>
			<Container variant={'border'} title="Silly" className="flex flex-col gap-3 p-3 items-center justify-center">
				<Button variant={'silly'} size={'sm'}>
					Silly
				</Button>
				<Button variant={'silly'}>Silly</Button>
				<Button variant={'silly'} size={'lg'}>
					Silly
				</Button>
			</Container>
			<Container variant={'border'} title="Link" className="flex flex-col gap-3 p-3 items-center justify-center">
				<Button variant={'link'} size={'sm'}>
					Link
				</Button>
				<Button variant={'link'}>Link</Button>
				<Button variant={'link'} size={'lg'}>
					Link
				</Button>
			</Container>
			<Container variant={'border'} title="Hidden" className="flex flex-col gap-3 p-3 items-center justify-center">
				<Button variant={'hidden'} size={'sm'}>
					Hidden
				</Button>
				<Button variant={'hidden'}>Hidden</Button>
				<Button variant={'hidden'} size={'lg'}>
					Hidden
				</Button>
			</Container>
		</div>
	);
}
