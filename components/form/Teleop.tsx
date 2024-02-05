import { FormInputType, FormItems } from '@/lib/formTypes';
import FormInput from '@/ui/FormInput';
import Heading from '../ui/Heading';
import Paragraph from '../ui/Paragraph';

type stepItems = FormItems & {
	updateForm: (item: Partial<FormItems>) => void;
};

// {
// 	type: 'toggle',
// 	toggled: ,
// 	onClick: () => setTest(!test),
// 	placeholder: 'text',
// },
// (parameter) teleop: {
//     scoredAmp: boolean; X
//     ampActivatedAmount: number;
//     ampScore: number; X
//     scoredSpeaker: boolean; X
//     speakerScore: number; X
//     amplifiedSpeakerScore: number;
//     hangOnChain: boolean;
//     hangInHarmony: boolean;
//     scoredTrap: boolean;
//     thrownNoteScore: boolean;
//     thrownNoteAmount: number;
// }

const Teleop = ({ updateForm, teleop }: stepItems) => {
	const formInputs: Array<FormInputType> = [
		{
			type: 'number',
			title: 'How much?',
			placeholder: teleop.ampScore.toString(),
			onChange: (e: any) => updateForm({ teleop: { ...teleop, ampScore: e.target.value } }),
		},

		{
			type: 'Scored Speaker',
			title: 'Speaker Score',
			placeholder: teleop.speakerScore.toString(),
			onChange: (e: any) => updateForm({ teleop: { ...teleop, speakerScore: e.target.value } }),
		},

		{
			type: 'toggle',
			onClick: () => updateForm({ teleop: { ...teleop, hangOnChain: !teleop.hangOnChain } }),
			toggled: teleop.hangOnChain,
			title: 'Hung On Chain?',
			description: 'Did they hang?',
			children: [
				{
					type: 'toggle',
					onClick: () => updateForm({ teleop: { ...teleop, hangInHarmony: !teleop.hangInHarmony } }),
					toggled: teleop.hangInHarmony,
					title: 'Hung On Chain?',
					description: 'Did they hang?',
				},
			],
		},
	];
	return (
		<div>
			<Heading size={'xs'}>Teleop</Heading>
			<Paragraph>Howd your robot preform during teleop?🗣️</Paragraph>
			<div className="py-2">
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

export default Teleop;
