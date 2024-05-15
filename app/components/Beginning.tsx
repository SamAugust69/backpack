import { LogType } from '@/lib/formTypes';
import FormInput from '@/ui/Input';
import Heading from '@/ui/Heading';

type stepItems = LogType & {
	updateForm: (item: Partial<LogType>) => void;
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
		<div className="py-2 flex flex-col gap-4">
			{formInputs.map((input: any, i) => {
				return (
					<FormInput key={i} {...input}>
						{input.children}
					</FormInput>
				);
			})}
		</div>
	);
};

export default Beginning;
