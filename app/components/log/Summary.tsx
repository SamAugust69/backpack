import { FormItems, ScoringTypes } from '@/lib/formTypes';
import { FC, createRef, useEffect, useRef, useState } from 'react';
import Paragraph from '../ui/Paragraph';

interface SummaryProps {
	data: FormItems;
	allData: Array<FormItems>;
	scores: ScoringTypes;
	toDisplay: any;
}

const Summary: FC<SummaryProps> = ({ data, toDisplay, scores}) => {
	const averageScoreWidth = useRef<any>(<div></div>);
	const [width, setWidth] = useState(0)
	const {autoScore, teleopScore, averageAuto, averageTeleop, averageTotal} = scores
	const averageScore =
	
	useEffect(() => {
		setWidth(averageScoreWidth.current.clientWidth)
	}, [])
	return (
		<div className="flex gap-2 flex-wrap">
			{toDisplay.map((val: any, i: number) => {
				return (
					<div key={i} className="bg-t-100 w-[18rem] rounded flex flex-col">
						<Paragraph size="sm" className="text-t-100 font-medium bg-b-100 p-2 rounded-t">
							{val.title}
						</Paragraph>

						<div className="p-2 flex gap-2 flex-col">
							{val.display.map((val: any, i: number) => {
								return (
									<div key={i} className="bg-t-200 rounded px-4  p-2 flex flex-col gap-2">
										{Object.entries(val).map((val2: any, i: number) => {
											const type = val2[1][0];
											const value = val2[1][1];
											const points = value * val2[1][2];
											// useEffect(() => {
											// 	setScore(score + total);
											// 	getTeamAverageScore(allData, data.team).map((val: FormItems) => {
											// 		averageScore += score / allData.length
											// 	})
											// }, [])
											//setScore(score + total)  // this causes too many rerenders333

											switch (type) {
												case 'number':
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
															<Paragraph size={'sm'}>{value == true ? '+ ' + val2[1][3] + 'pt' : null}</Paragraph>
														</div>
													);
												default:
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
							<Paragraph className="text-b-100 font-medium text-right px-2" size={'sm'}>
								{i == 0 ? autoScore : null}
								{i == 1 ? teleopScore : null}
								{i == 2 ? autoScore + teleopScore : null}
								pt
							</Paragraph>
						</div>
					</div>
				);
			})}
			<div className="bg-t-100 rounded flex flex-col max-w-[36rem]">
				<Paragraph size="sm" className="text-t-100 font-medium bg-b-100 p-2 rounded-t">
					Summary
				</Paragraph>
				<div className="bg-t-100 p-2 flex gap-2 flex-col sm:w-fit w-[18rem]">
					<div className='flex sm:flex-row flex-col gap-2'>
						<div className="bg-t-200 rounded p-2 flex flex-col gap-2 px-4">
							<Paragraph size={'sm'} className=''>
								<span className="text-r-100">{autoScore + teleopScore}</span> Total Points
							</Paragraph>
							<Paragraph size={'sm'}>
								<span className="text-r-100">{autoScore}</span> Auto Points
							</Paragraph>
							<Paragraph size={'sm'}>
								<span className="text-r-100">{teleopScore}</span> Teleop Points
							</Paragraph>
						</div>
						<div className='sm:w-60'>
							<div className="bg-t-200 rounded h-2 flex justify-between items-center relative" ref={averageScoreWidth}>
								<div style={{width: `${((teleopScore + autoScore) / averageTotal) * width}px `}} className={`h-full bg-t-600 rounded-l flex items-center rounded`}/>
							</div>
							<Paragraph className='text-b-100 text-center mt-1 mb-2' size={"xs"}>{Math.floor(((teleopScore + autoScore) / (averageTotal)) * 100) }% compared to average</Paragraph>
							<div className="bg-t-200 rounded h-2 flex justify-between items-center relative" >
								<div style={{width: `${Math.floor( ((autoScore) / (averageAuto)) * width )}px `}} className={`h-full bg-t-600 rounded-l flex items-center rounded`}/>
							</div>
							<Paragraph className='text-b-100 text-center mt-1 mb-2' size={"xs"}>{Math.floor((autoScore / (averageAuto)) * 100) }% compared to average</Paragraph>
							<div className="bg-t-200 rounded h-2 flex justify-between items-center relative" >
								<div style={{width: `${Math.floor( ((teleopScore) / (averageTeleop)) * width )}px `}} className={`h-full bg-t-600 rounded-l flex items-center rounded`}/>
							</div>
							<Paragraph className='text-b-100 text-center mt-1' size={"xs"}>{Math.floor((teleopScore / (averageTeleop)) * 100) }% compared to average</Paragraph>
						</div>
					</div>
					
					{data.notes.length > 0 ? (
						<div className="bg-t-200 rounded p-2 flex flex-col max-w-[24.25rem] gap-2 h-28 overflow-scroll">
							<Paragraph className="text-b-100 font-semibold m-0">Notes</Paragraph>
							<Paragraph className="text-b-100 font-normal">{data.notes}</Paragraph>
						</div>
					) : (
						<div className="bg-t-200 rounded p-2 flex flex-col gap-2">
							<Paragraph className="text-b-100 font-semibold m-0">No Notes</Paragraph>
						</div>
					)}
					<Paragraph className='bg-t-200 rounded px-4 p-2 text-b-100' size={"xs"}>Scouted by: {data.scout}</Paragraph>
				</div>
			</div>
		</div>
	);
};

export default Summary;
