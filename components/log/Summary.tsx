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
			display: [
				{
					'Left Starting Zone': ['number', data.auto.leftStartingZone, 2],
				},
				{
					"Speaker Note's Scored": ['number', data.auto.speakerScore, 5],
					"Amp Note's Scored": ['number', data.auto.ampScore, 2],
				},
			],
		},
		{
			title: 'Teleop Summary',
			display: [
				{
					"Amp Note's Scored": ['number', data.teleop.ampScore, 1],
					'Amp Activations': ['number', data.teleop.ampActivatedAmount, 0],
				},
				{
					'Speaker Score': ['number', data.teleop.speakerScore, 2],
					'Amplified Speaker Score': ['number', data.teleop.amplifiedSpeakerScore, 5],
				},
				{
					Hung: ['boolean', data.teleop.hangOnChain, 'Did Not Hang'],
				},
			],
		},
	];
	var total = 0; // dont usestate this. I want it to be different for each instance.

	return (
		<div className="flex gap-2 flex-wrap">
			{thing.map((val: any, i: number) => {
				return (
					<div key={i} className="bg-t-100 min-w-72 rounded">
						<Paragraph size="sm" className="text-t-100 font-medium bg-b-100 p-2 rounded-t">
							{val.title}
						</Paragraph>

						<div className="p-2 flex gap-2 flex-col">
							{val.display.map((val: any, i: number) => {
								console.log(val);
								return (
									<div key={i} className="bg-t-200 rounded  p-2 flex flex-col gap-2">
										{Object.entries(val).map((val2: any, i: number) => {
											console.log(val2);
											const type = val2[1][0];
											const value = val2[1][1];
											const points = value * val2[1][2];

											switch (type) {
												case 'number':
													total += points;
													return (
														<div key={i} className="flex justify-between font-medium text-b-100 items-center">
															<Paragraph size={'sm'} className="">
																<span className={`${value < 0 ? '' : 'pr-2'} text-r-100`}>{value}</span>
																{val2[0]}
															</Paragraph>
															<Paragraph size={'sm'}>{points > 0 ? '+ ' + points + 'pt' : null}</Paragraph>
														</div>
													);
												case 'boolean':
													return (
														<div key={i} className="flex justify-between font-medium text-b-100 items-center">
															<Paragraph size={'sm'} className="">
																{value ? val2[0] : val2[1][2]}
															</Paragraph>
															<Paragraph size={'sm'}>{points > 0 ? '+ ' + points + 'pt' : null}</Paragraph>
														</div>
													);
												default:
													total += points;
													return (
														<div key={i} className="flex justify-between font-medium text-b-100 items-center">
															<Paragraph size={'sm'} className="">
																<span className={`${value < 0 ? '' : 'pr-2'} text-r-100`}>{value}</span>
																{val2[0]}
															</Paragraph>
															<Paragraph size={'sm'}>{points > 0 ? '+ ' + points + 'pt' : null}</Paragraph>
														</div>
													);
											}
										})}
									</div>
								);
							})}
							<Paragraph className="text-b-100 font-medium" size={'sm'}>
								Total{total}
							</Paragraph>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Summary;
