'use client';
import { ChevronDown, Plus, SearchIcon } from 'lucide-react';
import { FC, useEffect, useReducer, useState } from 'react';
import { Button } from '@/ui/Button';
import useLocalStorage from '@rehooks/local-storage';
import { unsavedReducer } from '@/lib/unsavedReducer';
import { FormItems } from '@/lib/formTypes';
import Paragraph from './ui/Paragraph';
import Form from './form/Form';
import useForm from '@/lib/useForm';
import LogView from '@/components/log/LogView';

interface LogdashProps {}

const Logdash: FC<LogdashProps> = ({}) => {
	const [localData, setLocalData] = useLocalStorage<Array<FormItems>>('local-data', []); // stores local match information from scout
	const [localDispatchState, localDispatch] = useReducer(unsavedReducer, localData);

	const [filteredData, setFilteredData] = useState<Array<FormItems>>(localData);

	const [isRendered, setIsRendered] = useState(false); // fixes hydration errors
	useEffect(() => {
		console.log('Rendered!');
		setIsRendered(true);
	}, []);

	useEffect(() => {
		setLocalData(localDispatchState);
		setFilteredData(localDispatchState);
	}, [localDispatchState]);

	const { formState, toggleOpen, setOpen, setClose } = useForm();

	const [currentFilter, setCurrentFilter] = useState(0);
	const filter = ['Recent', 'Team', 'Match'];

	// so, i want sort by each team. I should loop over the logs. Add to array of team if part of team, else, create
	const listTeams = () => {
		var final: Array<number> = []
		localData.map((val: FormItems) => {
			if (final.length == 0) {final = [val.team] } else {
				if (final.some((ele: number) => (ele == val.team)) == false) {
					final = [
						...final,
						val.team
					]
				}
			}
	
		
		})
		return final
	}

	const listLogsWithTeam = (team: number) => {
		var final: Array<FormItems> = []
		localData.map((log: FormItems) => {
			if (log.team == team) final = [...final, log]
		})
		return final
	}

	const listMatches = () => {
		var final: Array<number> = []
		localData.map((val: FormItems) => {
			if (final.length == 0) {final = [val.match] } else {
				if (final.some((ele: number) => (ele == val.match)) == false) {
					final = [
						...final,
						val.match
					]
				}
			}
	
		
		})
		return final
	}

	
	const listLogsWithMatch = (match: number) => {
		var final: Array<FormItems> = []
		localData.map((log: FormItems) => {
			if (log.match == match) final = [...final, log]
		})
		return final
	}

	const Normal = () => {
		setFilteredData(
			filteredData.sort((a, b) => {
				if (new Date(a.dateAdded).getTime() > new Date(b.dateAdded).getTime()) return -1;
				else if (new Date(a.dateAdded).getTime() < new Date(b.dateAdded).getTime()) return 1;
				return 0;
			})
		);
		return (
			filteredData.map((val: FormItems, i: number) => {
				return <LogView key={i} data={val} />;
			})
		)
	}
	const [averageScore, setAverageScore] = useState(0);

	const filterSwitch = (prop: number) => {
		switch (prop) {
			case 0:
				return (<Normal/>)
				break;
			case 1:
				return (
					listTeams().map((team: number, i: number) => {
						return (
							<div key={i} className='bg-t-100 flex flex-col gap-2 p-2 rounded'>
								<div className='p-2'>
								<Paragraph size="xs" className="font-medium text-b-100 dark:text-[#3A2C27] text-left">
									Team <span className="text-r-100 px-1">{team}</span>
								</Paragraph>
								</div>
								{listLogsWithTeam(team).map((log: FormItems, i: number) => {
									return <LogView key={i} data={log} className='bg-t-300'/>
								})}
							</div>
						)
					})
				)
				break;
			case 2:
				return (
					listMatches().map((match: number, i: number) => {
						
						return (
							<div key={i} className='bg-t-100 flex flex-col gap-2 p-2 rounded'>
								<div className='p-2'>
									<Paragraph size="xs" className="font-medium text-b-100 dark:text-[#3A2C27] text-left">
										Match <span className="text-r-100 px-1">{match}</span>
									</Paragraph>
									{averageScore}
								</div>
								{listLogsWithMatch(match).map((log: FormItems, i: number) => {
									return <LogView key={i} data={log} className='bg-t-300'/>
								})}
							</div>
						)
					})
				)
			default:
				return <div></div>
		}
	}

	return (
		<>
			<Form dispatch={localDispatch} modalState={formState} closeModal={setClose} />
			<div className=" rounded-md bg-g-100 border-2 border-t-100 max-w-5xl min-w-fit w-full">
				<div className="bg-r-200 border-b-2 border-t-100 rounded-t p-2 flex justify-between flex-col sm:flex-row gap-2">
					<div className="flex gap-2">
						<Button onClick={() => setOpen()}>
							<Plus className="w-4 h-4 mr-1" /> New Log
						</Button>
						<div className="bg-r-100 p-2 rounded flex gap-2 items-center">
							<SearchIcon className="text-[#C9B08E] w-4 h-4" />
							<input
								type="text"
								className="bg-transparent text-t-100 placeholder-t-100 disabled:pointer-events-none outline-none text-sm mx-1"
								placeholder="Search"
							/>
						</div>
					</div>

					<div>
						{filter.map((val: any, i: number) => {
							return (
								<Button
									key={i}
									variant="hidden"
									className={`text-t-100 ${currentFilter == i ? 'bg-[#3A2C27]' : ''}`}
									onClick={() => setCurrentFilter(i)}
								>
									{val}
								</Button>
							);
						})}
					</div>
				</div>
				<div className="bg-g-100 rounded p-2 flex flex-col gap-2">
					{isRendered
						?
						<>
						{filterSwitch(currentFilter)}
						</>
						
						: null}
				</div>
			</div>
		</>
	);
};

export default Logdash;
