import { FormInputType, FormItems } from '@/lib/formTypes';
import FormInput from '@/ui/FormInput';
import Heading from '@/ui/Heading';
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

const Auto = ({ updateForm, auto }: stepItems) => {
	const formInputs: Array<FormInputType> = [
		{
			type: 'toggle',
			onClick: (e: any) =>
				updateForm({
					auto: { ...auto, leftStartingZone: !auto.leftStartingZone },
				}),
			toggled: auto.leftStartingZone,
			title: 'Left Starting Zone',
			description: 'Yeh',
		},
		{
			type: 'toggle',
			onClick: (e: any) =>
				updateForm({
					auto: { ...auto, scored: !auto.scored },
				}),
			toggled: auto.scored,
			description: 'Did the robot score during auto?',
			children: [
				{
					type: 'number',
					onChange: (e: any) => {
						e.stopPropagation();
						updateForm({
							auto: { ...auto, speakerScore: Number.isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value) },
						});
					},
					title: 'Speaker Score',
					placeholder: auto.ampScore.toString(),
				},
				{
					type: 'number',
					onChange: (e: any) =>
						updateForm({
							auto: { ...auto, ampScore: Number.isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value) },
						}),
					title: 'Amp Score',
					placeholder: auto.ampScore.toString(),
				},
			],
			title: 'Scored',
		},
	];
	return (
		<div>
			<Heading size={'uberSmall'} className="text-t-100 my-1">
				Auto
			</Heading>
			<div className="py-2 flex flex-col gap-2">
				{formInputs.map((input: any, i) => {
					return (
						<>
							<FormInput key={i} {...input}>
								{input.children}
							</FormInput>
						</>
					);
				})}
			</div>
		</div>
	);
};

export default Auto;
