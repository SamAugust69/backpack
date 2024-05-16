import { FormInputType, LogType } from '@/lib/formTypes';
import FormInput from '@/ui/Input';
import Heading from '@/ui/Heading';
import { useEffect, useRef } from 'react';
import Paragraph from './ui/Paragraph';

type stepItems = LogType & {
	updateForm: (item: Partial<LogType>) => void;
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

const Notes = ({ updateForm, bot_preformed, notes }: stepItems) => {
	const formInputs: Array<FormInputType> = [
		{
			type: 'toggle',
			onClick: (e: any) => {
				e.stopPropagation();
				updateForm({ bot_preformed: bot_preformed != 'bad' ? 'bad' : 'well' });
			},
			toggled: bot_preformed == 'bad',
			title: 'Broke? (toby button)',
			description: 'Were they DISABLED for the majority of the match?',
		},
	];

	useEffect(() => {
		textbox.current.value = notes;
	}, [notes]);

	const textbox = useRef<any>(<div></div>);

	return (
		<div className="py-2 flex flex-col gap-4">
			{formInputs.map((input: any, i) => {
				return (
					<FormInput key={i} {...input}>
						{input.children}
					</FormInput>
				);
			})}
			<div className="flex flex-col">
				<textarea
					ref={textbox}
					onChange={(e: any) => updateForm({ notes: e.target.value })}
					className="p-2 bg-transparent border border-neutral-600 focus:ring-0 rounded text-t-100"
				/>
				<Paragraph size={'xs'}>Optional, but encouraged notes</Paragraph>
			</div>
		</div>
	);
};

export default Notes;
