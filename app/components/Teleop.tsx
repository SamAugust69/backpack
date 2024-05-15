import { FormInputType, LogType } from '@/lib/formTypes';
import FormInput from '@/ui/Input';
import Heading from '@/ui/Heading';
import { useEffect, useRef } from 'react';

type stepItems = LogType & {
	updateForm: (item: Partial<LogType>) => Promise<void>;
};

// {
// 	type: 'toggle',
// 	toggled: ,
// 	onClick: () => setTest(!test),
// 	value: 'text',
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
			title: 'Speaker Notes Scored',
			value: teleop.speakerScore.toString(),
			onChange: (e: any) => updateForm({ teleop: { ...teleop, speakerScore: parseInt(e.target.value) } }),
			incrementButtons: true,
			increment: (setThing: Function) => {
				updateForm({ teleop: { ...teleop, speakerScore: teleop.speakerScore + 1 } }).then(
					setThing(teleop.speakerScore + 1)
				);
			},
			decrease: (setThing: Function) => {
				updateForm({ teleop: { ...teleop, speakerScore: teleop.speakerScore - 1 } }).then(
					setThing(teleop.speakerScore - 1)
				);
			},
		},
		{
			type: 'number',
			title: 'Speaker (Amplified) Notes Scored',
			value: teleop.amplifiedSpeakerScore.toString(),
			onChange: (e: any) => updateForm({ teleop: { ...teleop, amplifiedSpeakerScore: parseInt(e.target.value) } }),
			incrementButtons: true,
			increment: (setThing: Function) => {
				updateForm({ teleop: { ...teleop, amplifiedSpeakerScore: teleop.amplifiedSpeakerScore + 1 } }).then(
					setThing(teleop.amplifiedSpeakerScore + 1)
				);
			},
			decrease: (setThing: Function) => {
				updateForm({ teleop: { ...teleop, amplifiedSpeakerScore: teleop.amplifiedSpeakerScore - 1 } }).then(
					setThing(teleop.amplifiedSpeakerScore - 1)
				);
			},
		},

		{
			type: 'number',
			title: 'Amp Notes Scored',
			value: teleop.ampScore.toString(),
			onChange: (e: any) => updateForm({ teleop: { ...teleop, ampScore: parseInt(e.target.value) } }),
			incrementButtons: true,
			increment: (setThing: Function) => {
				updateForm({ teleop: { ...teleop, ampScore: teleop.ampScore + 1 } }).then(setThing(teleop.ampScore + 1));
			},
			decrease: (setThing: Function) => {
				updateForm({ teleop: { ...teleop, ampScore: teleop.ampScore - 1 } }).then(setThing(teleop.ampScore - 1));
			},
		},

		{
			type: 'toggle',
			onClick: () => updateForm({ teleop: { ...teleop, parkOnStage: !teleop.parkOnStage, hangOnChain: false } }),
			toggled: teleop.parkOnStage,
			title: 'Parked on Stage',
			description: 'Did the robot park on the line(not on chain)?',
		},
		{
			type: 'message',
			title: '-- OR --',
		},

		{
			type: 'toggle',
			onClick: () => updateForm({ teleop: { ...teleop, hangOnChain: !teleop.hangOnChain, parkOnStage: false } }),
			toggled: teleop.hangOnChain,
			title: 'Hung On Chain',
			description: 'Did they hang?',
			children: [
				{
					type: 'toggle',
					onClick: (e: any) => {
						e.stopPropagation();
						updateForm({ teleop: { ...teleop, hangInHarmony: !teleop.hangInHarmony } });
					},
					toggled: teleop.hangInHarmony,
					title: 'Harmonize',
					description: 'Did atleast two robots hang on the same chain?',
				},
			],
		},
	];
	return (
		<div className="py-2 flex flex-col gap-2">
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

export default Teleop;
