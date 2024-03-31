'use client';
import { Dispatch, FC, useEffect, useState } from 'react';
import Modal from '@/ui/Modal';
import { Button } from '../ui/Button';
import { FormItems } from '@/lib/formTypes';
import { initialValues } from '@/lib/formTypes';
import { v4 as uuidv4 } from 'uuid';

import Auto from '@/components/form/Auto';
import useMultiForm from '@/lib/useMultiForm';
import Teleop from '@/components/form/Teleop';
import Beginning from './Beginning';
import Notes from './Notes';

interface FormTestProps {
	modalState: boolean;
	dispatch: any;
	closeModal: Function;
	initValue?: Partial<FormItems>
}
 
const Form: FC<FormTestProps> = ({ modalState, closeModal, dispatch, initValue }) => {
	const [updatedFields, setUpdatedFields] = useState<Partial<FormItems>>({})
	const [formData, setFormData] = useState({...initialValues, ...initValue, ...updatedFields});

	useEffect(() => {
		setFormData({...initialValues, ...initValue, ...updatedFields})
		setUpdatedFields({...updatedFields, ...initValue})
	}, [initValue])

	useEffect(() => {
		updateForm({ id: uuidv4().substring(0, 16) })
	}, [])

	const updateForm = async (fieldsToUpdate: Partial<FormItems>) => {
		new Promise((resolve) => {
			setUpdatedFields({...updatedFields, ...fieldsToUpdate})
			setFormData({...formData, ...fieldsToUpdate})
			console.log({ ...updatedFields });
			//setFormData(updatedForm);
			resolve({...formData, ...fieldsToUpdate});
		});
	};

	// useEffect(() => {
	// 	if (submitted == true) {
	// 		console.log("Submitted")
	// 		updateForm({ id: uuidv4() });
	// 		setSubmitted(false);
	// 	}
	// }, [submitted]);

	const handleKey = (event: any) => {
		if (event.key == 'ArrowDown' || event.key == 'ArrowRight') forwards();
		if (event.key == 'ArrowUp' || event.key == 'ArrowLeft') backwards();
	};

	const MultiFormSteps = ['Beginning', 'Auto', 'Teleop', 'Notes'];

	const { currentStep, forwards, backwards, goToStep, currentStepNumber, isFirstStep, isLastStep } = useMultiForm([
		//<Example key={-1} {...formData} updateForm={updateForm} />,
		<Beginning key={0} {...formData} updateForm={updateForm} />,
		<Auto key={11} {...formData} updateForm={updateForm} />,
		<Teleop key={2} {...formData} updateForm={updateForm} />,
		<Notes key={3} {...formData} updateForm={updateForm} />,
		//<Finishing key={3} {...formData} updateForm={updateForm} />,
	]);

	const handleSubmit = (e: any) => {
		e.preventDefault();
		goToStep(0);

		console.log('submitted log', updatedFields);
		dispatch({ type: 'added', payload: updatedFields });

		closeModal();
		setUpdatedFields({id: uuidv4().substring(0, 16)});
		setFormData(structuredClone(initialValues));
	};

	return (
		<>
			<Modal
				open={modalState}
				setOpen={closeModal}
				className="bg-g-100 sm:bg-g-100 flex flex-col sm:flex-row p-0 relative border-0 max-w-4xl sm:h-5/6 h-full w-full sm:w-11/12"
			>
				<div className="bg-g-200 border-b-2 border-t-100 w-full rounded-t sm:rounded h-40 sm:h-full absolute z-0 left-0 top-0 visible sm:invisible"></div>
				<div
					tabIndex={0}
					onKeyUp={handleKey}
					className="flex flex-col sm:flex-row p-4 h-full overflow-scroll w-full max-h-fit"
				>
					<div className="flex pb-2 items-center flex-col sm:flex-col mr-0 sm:mr-4 px-4 py-4 relative bg-g-200 sm:border-2 border-0 border-t-100 rounded">
						<div className="flex justify-center sm:flex-col">
							{MultiFormSteps.map((step, i) => {
								return (
									<button key={i} onClick={() => goToStep(i)} className="flex p-4 z-10">
										<div
											className={`rounded-full border-2 w-10 h-10 flex items-center justify-center font-semibold text-center transition-colors ${
												currentStepNumber == i ? 'text-t-100 border-r-200 bg-r-400' : 'text-b-100 bg-t-300 border-t-400'
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
						</div>
						<Button variant={'hidden'} className={`text-t-100 w-20 sm:scale-0 scale-100`} onClick={() => closeModal()}>
							Close
						</Button>
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
							<Button className="text-t-100 bg-b-100 h-full" onClick={isLastStep ? handleSubmit : forwards}>
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
