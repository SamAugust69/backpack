import { FormItems } from '@/lib/formTypes';
import { FC, useEffect, useState } from 'react';
import Paragraph from '../ui/Paragraph';

interface SummaryProps {
	data: FormItems;
}

const Summary: FC<SummaryProps> = ({ data }) => {
	const thing: Array<any> = [
		{
			title: 'Auto Summary',
			display: {
				'Left Starting Zone': [data.auto.leftStartingZone, 2],
				"Speaker Note's Scored": [data.auto.speakerScore, 5],
				"Amp Note's Scored": [data.auto.ampScore, 2],
			},
		},
		{
			title: 'Teleop Summary',
			display: {
				"Amp Note's Scored": [data.teleop.ampScore, 1],
				"Amp Activations": [data.teleop.ampActivatedAmount, 0],
				"Speaker Score": [data.teleop.speakerScore, 2],
				"Amplified Speaker Score": [data.teleop.amplifiedSpeakerScore, 5],
				"Hung": [data.teleop.hangOnChain, 0],
			},
		},
		{
			title: "Summary",
			display: {
				
			}
		}
	];
	var total = 0; // dont usestate this. I want it to be different for each instance.

	return (
		<div className='flex gap-2 flex-wrap'>
			{thing.map((val: any, i: number) => {
				
				return (
					<div key={i} className="bg-t-100 min-w-72 rounded">
						<Paragraph size="sm" className="text-t-100 font-medium bg-b-100 p-2 rounded-t">
							{val.title}
						</Paragraph>

						<div className="p-2 flex gap-2 flex-col">
							{Object.entries(val.display).map((val: any, i: number) => {
								console.log(val);
								var points: number = val[1][0] * val[1][1];
								total += points
								
								return (
										<div key={i} className="flex justify-between bg-t-200 rounded font-medium text-b-100 items-center p-2">
											<Paragraph size={'sm'} className="">
												<span className={`${val[1][0] < 0 ? "" : "pr-2"} text-r-100`}>{val[1][0]}</span>
												{val[0]}
											</Paragraph>
											<Paragraph size={'sm'}>{points > 0 ?  "+ " + points + "pt" : null}</Paragraph>
										</div>
									
								);
								
							})}
							<Paragraph className='text-b-100 font-medium' size={"sm"}>Total{total}</Paragraph>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Summary;
