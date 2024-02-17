import { FormInputType, FormItems } from '@/lib/formTypes';
import FormInput from '@/ui/FormInput';
import Heading from '../ui/Heading';
import Paragraph from '../ui/Paragraph';

type stepItems = FormItems & {
	updateForm: (item: Partial<FormItems>) => void;
};

const Example = ({ updateForm }: stepItems) => {
	const formInputs: Array<FormInputType> = [
		{
			type: 'toggle',
			title: 'Toggle',
			description: 'Toggle Example',
			toggled: true,
			children: [
				{
					type: 'toggle',
					title: 'Child Checkbox Example',
					description: 'This toggle is false',
					toggled: false,
					checkbox: true,
				},
				{
					type: 'toggle',
					title: 'Child Checkbox Example',
					description: 'This toggle is true',
					toggled: true,
					checkbox: true,
				},
			],
		},
		{
			type: 'text',
			title: 'Textbox',
			placeholder: 'Example',
		},
		{
			type: 'number',
			title: 'Textbox',
			placeholder: 'Example',
		},
		{
			type: 'carousel',
		},
	];
	return (
		<div>
			<Heading size={'uberSmall'} className="text-t-100 my-1">
				Example Page
			</Heading>
			<div className="py-2 flex flex-col gap-2">
				{formInputs.map((input: any, i) => {
					return (
						<FormInput key={i} {...input}>
							{input.children}
						</FormInput>
					);
				})}
			</div>
		</div>
	);
};

export default Example;
