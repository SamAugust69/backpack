import { FC } from 'react';
import { FormItems } from '@/lib/formTypes';
import FormInput from '@/ui/FormInput';
import Heading from '@/ui/Heading';
import Paragraph from '@/ui/Paragraph';

type stepItems = FormItems & {
	updateForm: (item: Partial<FormItems>) => void;
};

const Beginning = ({ updateForm, team, match, scout }: stepItems) => {
	const formInputs = [
		{
			type: 'number',
			onChange: (e: any) => updateForm({ match: Number.isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value) }),
			title: 'Match',
			value: match.toString(),
		},
		{
			type: 'number',
			onChange: (e: any) => updateForm({ team: Number.isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value) }),
			title: 'Team',
			value: team.toString(),
		},
		{
			type: 'text',
			onChange: (e: any) => updateForm({ scout: e.target.value }),
			title: "Scouter's Name",
			value: scout,
		},
	];
	return (
		<div>
			<Heading size={'uberSmall'} className="text-t-100 my-1">
				Team Info
			</Heading>
			<div className="py-2 flex flex-col gap-3">
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

export default Beginning;
