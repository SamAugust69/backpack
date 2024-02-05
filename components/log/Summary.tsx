import { FormItems } from '@/lib/formTypes';
import { FC } from 'react';
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
	];

	return (
		<div>
			{thing.map((val: any) => {
				console.log(val);
				return (
					<div className="bg-t-100 w-72 rounded">
						<Paragraph size="xs" className="text-t-100 font-medium bg-b-100 p-2 rounded-t">
							{val.title}
						</Paragraph>

						<div className="p-2 flex gap-2 flex-col">
							{Object.entries(val.display).map((val: any) => {
								console.log(val);
								var score: number = val[1][0];
								var points: number = score * val[1][1];

								return (
									<div className="flex justify-between bg-t-300 rounded font-medium text-b-100 items-center">
										<Paragraph size={'xs'} className="p-2 ">
											<span className={`${score ? 'pr-2' : ''}`}>{score}</span>
											{val[0]}
										</Paragraph>
										<Paragraph size={'xs'}>{points > 0 ? points : null}</Paragraph>
									</div>
								);
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Summary;
