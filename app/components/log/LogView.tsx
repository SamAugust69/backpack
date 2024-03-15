import { FC, HTMLAttributes, useEffect, useState } from 'react';
import Paragraph from '../ui/Paragraph';
import { ChevronDown, Delete } from 'lucide-react';
import { Button } from '../ui/Button';
import { FormItems, ScoringTypes } from '@/lib/formTypes';
import { MdDeleteForever } from 'react-icons/md';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Summary from './Summary';
import { cn } from '@/lib/utils';
import { REDUCER_ACTION_TYPE } from '@/app/lib/unsavedReducer';

interface LogViewProps extends HTMLAttributes<HTMLDivElement> {
	data: FormItems;
	allData: Array<FormItems>;

	scores: ScoringTypes;
	toDisplay: any;
	localDispatch: Function;
}

const LogView: FC<LogViewProps> = ({ localDispatch, toDisplay, scores, data, allData, className }) => {
	const [open, setOpen] = useState(false);
	const [optionsOpen, setOptionsOpen] = useState(false);

	return (
		<div className={cn(`bg-t-100 rounded flex flex-col ${className}`)}>
			<div className="p-2 flex justify-between items-center">
				<div className="flex gap-4">
					<Paragraph size="sm" className="font-medium text-b-100 dark:text-[#3A2C27] text-left">
						Match <span className="text-r-100 px-1">{data.match}</span>
					</Paragraph>
					<Paragraph size="sm" className="font-medium text-b-100 dark:text-[#3A2C27] text-left">
						Team <span className="text-r-100 px-1">{data.team}</span>
					</Paragraph>
				</div>
				<div className="flex">
					<div className="flex justify-center items-center rounded bg-t-200">
						{optionsOpen ? (
							<div className="flex items-center gap-2 justify-center px-2">
								<Button className="px-3 my-1" size={'sm'} onClick={() => localDispatch({ type: 'removed', payload: data })}>
									Edit
								</Button>
								<Button className="px-3 bg-r-200" size={'sm'} onClick={() => localDispatch({ type: 'removed', payload: data })}>
									Delete
									<MdDeleteForever className="ml-2" />{' '}
								</Button>
							</div>
						) : null}
						<Button variant={'hidden'} onClick={() => setOptionsOpen(!optionsOpen)}>
							<HiOutlineDotsHorizontal className='text-b-100'/>
						</Button>
					</div>
					<Button variant="hidden" onClick={() => setOpen(!open)}>
						<ChevronDown className={`text-b-100 w-4 ${open ? 'rotate-180' : ''}`} />
					</Button>
				</div>
			</div>
			{open ? (
				<div className="bg-t-200 rounded p-2 flex flex-wrap gap-2 overflow-scroll">
					<Summary toDisplay={toDisplay} scores={scores} data={data} allData={allData}  />
				</div>
			) : null}
		</div>
	);
};

export default LogView;
