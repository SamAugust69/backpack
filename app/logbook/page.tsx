'use client';
import { Plus } from 'lucide-react';
import Heading from '../components/ui/Heading';
import Paragraph from '../components/ui/Paragraph';
import '../globals.css';
import { Button } from '../components/ui/Button';
import { LuImport } from 'react-icons/lu';
import useMultiForm from '../lib/useMultiForm';
import { useRef, useState } from 'react';
import Fade from '../components/ui/Fade';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import FormInput from '../components/ui/FormInput';
import AnimatedPage from '../components/ui/AnimatedPage';
import Error from '../components/ui/Error';
import fetchData from '../lib/apiCall';

const testData: Array<eventType> = [];

type eventType = {
	city: string;
	country: string;
	district: {
		abbreviation: string;
		display_name: string;
		key: string;
		year: number;
	};
	end_date: string;
	event_code: string;
	event_type: number;
	key: string;
	name: string;
	start_date: string;
	state_prov: string;
	year: number;
};

export default function Page() {
	const fileInput = useRef<null | HTMLInputElement>(null);

	//showErr('No Internet', 'You need internet to use this feature', 10)

	const searchEvents = async () => {
		// const data = fetchData({
		// 	url: 'https://www.thebluealliance.com/api/v3/team/frc155/events/2024/keys',
		// 	onErr: () => showErr('Search Failed', 'Check your internet connection', 5),
		// });
		console.log(
			fetchData({
				url: 'https://www.thebluealliance.com/api/v3/team/frc155/events/2024/keys',
				onErr: () => showErr('Search Failed', 'Check your internet connection', 5),
			})
		);
	};

	const handleFileChange = (event: any) => {
		const fileObj = event.target.files && event.target.files[0];
		if (!fileObj) {
			return;
		}

		console.log('fileObj is', fileObj);

		event.target.value = null;

		console.log(event.target.files);

		console.log(fileObj);
		console.log(fileObj.name);
	};

	const { errContainer, showErr } = Error();

	const { currentStep, forwards, goToStep } = useMultiForm([
		<Fade key={0} className="py-2 flex flex-col gap-4">
			<Button
				size={'xl'}
				className="bg-t-300 rounded-md flex border-2 justify-normal border-g-950 hover:bg-t-300/75 transition-colors h-20"
				onClick={() => goToStep(1)}
			>
				<Plus className="p-3 w-10 h-10 font-bold rounded-md bg-t-400 text-g-950" />
				<div className="flex flex-col justify-center">
					<Paragraph className="m-0 text-g-950 flex px-4" size={'sm'}>
						Create Manually
					</Paragraph>
					<Paragraph className="m-0 text-g-700 flex px-4" size={'xs'}>
						Start Fresh
					</Paragraph>
				</div>
			</Button>
			<input type="file" className="hidden" accept=".json" onChange={handleFileChange} ref={fileInput} />
			<Button
				size={'xl'}
				onClick={() => fileInput.current?.click()}
				className="bg-t-300 rounded-md flex justify-normal hover:bg-t-300/75 transition-colors h-16"
			>
				<LuImport className="p-3 w-10 h-10 font-bold rounded-md bg-t-400 text-t-950" />
				<div className="flex flex-col ">
					<Paragraph className="m-0 text-g-950 flex px-4" size={'sm'}>
						Import Event
					</Paragraph>
					<Paragraph className="m-0 text-g-700 flex px-4" size={'xs'}>
						Import event from JSON
					</Paragraph>
				</div>
			</Button>
		</Fade>,
		<Fade key={0} className={'h-full flex flex-col justify-between '}>
			<div className="flex gap-2"></div>

			<div className="">
				<Paragraph
					size={'sm'}
					className="px-4 text-g-950 bg-t-500 py-1 rounded-t-md flex items-center justify-between font-bold"
				>
					Event Searcher <span className="text-r-900 text-xs underline">Requires Internet</span>
				</Paragraph>
				<AnimatedPage className={'bg-t-300 rounded-b-md p-2'}>
					<div className="flex gap-2 p-2 bg-t-400 rounded-md">
						<Button size={'md'} className="text-t-400" onClick={() => searchEvents()}>
							Search
						</Button>
						<FormInput type="number" title="Team Number" value={155}></FormInput>
						<FormInput type="number" title="Year" value={2024}></FormInput>
					</div>
					{searchEvents.length > 0 ? (
						<div className="flex flex-col gap-1 mt-2">
							{testData.map((event) => {
								let startDate = `${new Date(event.start_date).getMonth() + 1}-${new Date(event.start_date).getDay()}`;
								let endDate = `${new Date(event.end_date).getMonth() + 1}-${new Date(event.end_date).getDay()}`;
								return (
									<div className="bg-t-300 p-2 mx-2 border-2 border-t-950 rounded-md flex flex-col items-center">
										<Paragraph size={'xs'}>
											{event.name} <span>{event.year}</span>
										</Paragraph>
										<Paragraph size={'xs'}>
											{startDate} {endDate}
										</Paragraph>
									</div>
								);
							})}
						</div>
					) : null}
				</AnimatedPage>
			</div>
			<Button className="justify-end" variant={'link'} onClick={() => goToStep(0)}>
				Back
			</Button>
		</Fade>,
	]);

	return (
		<div className="gap-4 overflow-scroll max-w-6xl w-full flex flex-col sm:flex-row justify-center h-[calc(100vh-48px)] p-4">
			<AnimatePresence> {errContainer}</AnimatePresence>
			<section className="bg-t-400 rounded-md py-4 px-8 flex flex-col w-full sm:min-w-[18rem] sm:w-[26rem]">
				<div className="py-2">
					<Heading size={'sm'} className="text-r-600 text-left">
						Welcome
					</Heading>
					<Paragraph className="text-g-700">Get Started- Select an Event</Paragraph>
				</div>
				<div className="py-2 flex flex-col ">
					<Button
						size={'xl'}
						className="bg-t-300 rounded-md flex items-center justify-center border-2 border-g-700 hover:bg-t-300/75 transition-colors"
					>
						<Paragraph className="m-0 text-g-700 flex px-8 items-center" size={'xs'}>
							Create New Event
							<Plus className="ml-2 w-4 h-4 font-bold" />
						</Paragraph>
					</Button>
				</div>
			</section>
			<section className="bg-t-400 rounded-md px-8 py-4 flex flex-col justify-center sm:max-w-[30rem] md:max-w-[34rem] h-full w-full">
				<MotionConfig transition={{ duration: 0.25 }}>{currentStep}</MotionConfig>
			</section>
		</div>
	);
}
