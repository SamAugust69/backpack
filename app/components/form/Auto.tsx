import { FormInputType, FormItems } from '@/lib/formTypes';
import FormInput from '@/ui/FormInput';
import Heading from '@/ui/Heading';
import Paragraph from '@/ui/Paragraph';

type stepItems = FormItems & {
	updateForm: (item: Partial<FormItems>) => Promise<void>;
};

// {
// 	type: 'toggle',
// 	toggled: ,
// 	onClick: () => setTest(!test),
// 	value: 'text',
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
			description: 'Did the robot leave the starting area?',
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
						updateForm({
							auto: { ...auto, speakerScore: Number.isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value) },
						});
					},
					title: 'Speaker Notes Scored',
					value: auto.speakerScore.toString(),
					incrementButtons: true,
					increment: (setThing: Function) => {
						updateForm({ auto: { ...auto, speakerScore: auto.speakerScore + 1 } }).then(setThing(auto.speakerScore + 1));
					},
					decrease: (setThing: Function) => {
						updateForm({ auto: { ...auto, speakerScore: auto.speakerScore - 1 } }).then(setThing(auto.speakerScore - 1));
					},
				},
				{
					type: 'number',
					onChange: (e: any) =>
						updateForm({
							auto: { ...auto, ampScore: Number.isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value) },
						}),
					title: 'Amp notes Scored',
					value: auto.ampScore.toString(),
					incrementButtons: true,
					increment: (setThing: Function) => {
						updateForm({ auto: { ...auto, ampScore: auto.ampScore + 1 } }).then(setThing(auto.ampScore + 1));
					},
					decrease: (setThing: Function) => {
						updateForm({ auto: { ...auto, ampScore: auto.ampScore - 1 } }).then(setThing(auto.ampScore - 1));
					},
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

export default Auto;
