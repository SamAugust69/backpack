'use client';
import { Dispatch, FC, useEffect, useState } from 'react';
import Modal from '@/ui/Modal';
import { Button } from '../ui/Button';
import { FormItems } from '@/lib/formTypes';
import { initialValues } from '@/lib/formTypes';
import { v4 } from 'uuid';

import Auto from '@/components/form/Auto';
import useMultiForm from '@/lib/useMultiForm';
import Teleop from '@/components/form/Teleop';
import Finishing from '@/components/form/Finishing';
import Beginning from './Beginning';
import Example from './Example';
import { REDUCER_ACTION_TYPE } from '@/lib/unsavedReducer';

interface FormTestProps {
	modalState: boolean;
	dispatch: any;
	closeModal: () => void;
}

const Form: FC<FormTestProps> = ({ modalState, closeModal, dispatch }) => {
	const [formData, setFormData] = useState(initialValues);

	const updateForm = (fieldsToUpdate: Partial<FormItems>) => {
		console.log({ ...fieldsToUpdate });
		setFormData({ ...formData, ...fieldsToUpdate });
	};

	const handleKey = (event: any) => {
		if (event.key == 'ArrowDown' || event.key == 'ArrowRight') forwards();
		if (event.key == 'ArrowUp' || event.key == 'ArrowLeft') backwards();
	};

	const MultiFormSteps = [ 'Beginning', 'Auto', 'Teleop', ];

	const { currentStep, forwards, backwards, goToStep, currentStepNumber, isFirstStep, isLastStep } = useMultiForm([
		//<Example key={-1} {...formData} updateForm={updateForm} />,
		<Beginning key={0} {...formData} updateForm={updateForm} />,
		<Auto key={1} {...formData} updateForm={updateForm} />,
		<Teleop key={2} {...formData} updateForm={updateForm} />,
		//<Finishing key={3} {...formData} updateForm={updateForm} />,
	]);

	useEffect(() => {
		updateForm({ dateAdded: new Date() });
	}, []);

	const handleSubmit = (e: any) => {
		e.preventDefault();
		goToStep(0);

		console.log('submitted log', formData);

		dispatch({ type: 'added', payload: formData });

		setFormData(initialValues);
		updateForm({ id: v4(), dateAdded: new Date() });

		closeModal();
	};

	return (
		<>
			<Modal
				visible={modalState}
				closeModal={closeModal}
				clickOut={true}
				className="bg-g-100 sm:bg-g-100 flex flex-col sm:flex-row p-0 relative border-0 max-w-4xl sm:h-5/6 h-full w-full sm:w-11/12"
			>
				<div className="bg-g-200 border-b-2 border-t-100 w-full rounded-t sm:rounded h-40 sm:h-full absolute z-0 left-0 top-0 visible sm:invisible"></div>
				<div
					tabIndex={0}
					onKeyUp={handleKey}
					className="flex flex-col sm:flex-row p-4 h-full overflow-scroll w-full max-h-fit"
				>
					<div className="flex flex-row pb-2 sm:flex-col sm:justify-normal justify-center mr-0 sm:mr-6 px-4 py-4 relative bg-g-200 sm:border-2 border-0 border-t-100 rounded">
						{MultiFormSteps.map((step, i) => {
							return (
								<button key={i} onClick={() => goToStep(i)} className="flex p-4 z-10">
									<div
										className={`rounded-full border-2 w-10 h-10 flex items-center justify-center font-semibold text-center transition-colors ${
											currentStepNumber == i
												? 'text-t-100 border-r-200 bg-r-600'
												: 'text-slate-400 bg-slate-400/25 border-slate-400'
										}`}
									>
										<p className="w-full">{i + 1}</p>
									</div>
									<div className="flex-col pl-3 hidden sm:flex w-44">
										<p className="text-left font-semibold leading-tight text-sm text-t-300">Step {i + 1}</p>
										<p className="text-left font-semibold leading-tight uppercase text-t-100 tracking-wide">{step}</p>
									</div>
								</button>
							);
						})}
						{/* <div className="bg-indigo-700 box-border w-full rounded h-full absolute z-0 left-0"></div> */}
					</div>
					<div className="flex-col justify-between flex w-full">
						<form className="bg-g-200 border-2 border-t-100 rounded p-4 z-10 shadow-lg sm:shadow-none items-center w-full overflow-scroll px-4">
							{currentStep}
						</form>
						{/* form nav w/large screen */}
						<div className="bg-g-200 border-2 border-t-100 hidden justify-between p-4 rounded-b sm:flex">
							<Button
								variant="link"
								className={`font-semibold text-slate-400 h-full ${isFirstStep ? 'invisible' : 'visible'}`}
								onClick={backwards}
							>
								Go Back
							</Button>
							<Button className="text-slate-100 bg-indigo-950 h-full" onClick={isLastStep ? handleSubmit : forwards}>
								{isLastStep ? 'Submit' : 'Next Step'}
							</Button>
						</div>
					</div>
				</div>
				{/* form nav w/small screen */}
				<div className="sm:hidden bg-g-200 flex border-t-2 border-t-200 justify-between p-4 rounded-b">
					<Button
						variant="link"
						className={`font-semibold text-t-100 h-full ${isFirstStep ? 'invisible' : 'visible'}`}
						onClick={backwards}
					>
						Go Back
					</Button>
					<Button className="text-t-100 bg-b-100 h-full" onClick={isLastStep ? handleSubmit : forwards}>
						{isLastStep ? 'Submit' : 'Next Step'}
					</Button>
				</div>
			</Modal>
		</>
	);
};

export default Form;
