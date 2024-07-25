import { Button } from './ui/Button';
import { Container } from './ui/Container';
import Paragraph from './ui/Paragraph';

const PageNotFound = () => {
	return (
		<Container className="max-w-4xl my-4 mx-2 flex self-center w-full justify-self-center items-center justify-center p-4 flex-col">
			<Paragraph>Page Not Found</Paragraph>
			<Paragraph className={'text-neutral-500'} size={'xs'}>
				Sorry...
			</Paragraph>
		</Container>
	);
};

export { PageNotFound };
