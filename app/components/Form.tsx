import { useState } from 'react';
import Modal from '@/ui/Modal';
import { Container } from '@/ui/Container';
import Paragraph from '@/ui/Paragraph';
import { Button } from '@/ui/Button';
import { Dot } from 'lucide-react';
import FormInput from '@/ui/Input';
import Beginning from '@/components/Beginning';
import Auto from '@/components/Auto';
import Teleop from '@/components/Teleop';
import Notes from '@/components/Notes';
import { LogType } from '@/lib/formTypes';
import useMultiForm from '@/lib/useMultiForm';

interface FormProps {
	formValues: LogType;
	modalState: boolean;
	closeModal: Function;
}

const Form = ({ modalState, closeModal, formValues }: FormProps) => {
	const [formData, setFormData] = useState<LogType>(structuredClone(formValues));
	const MultiFormSteps = ['Team Info', 'Auto', 'Teleop', 'Notes'];

	const updateForm = async (fieldsToUpdate: Partial<LogType>) => {
		new Promise((resolve) => {
			const updatedForm = { ...formData, ...fieldsToUpdate };
			console.log({ ...fieldsToUpdate });
			setFormData(updatedForm);
			resolve({ ...formData, ...fieldsToUpdate });
		});
	};

	const { currentStep, forwards, backwards, goToStep, currentStepNumber, isFirstStep, isLastStep } = useMultiForm([
		<Beginning key={0} {...formData} updateForm={updateForm} />,
		<Auto key={1} {...formData} updateForm={updateForm} />,
		<Teleop key={2} {...formData} updateForm={updateForm} />,
		<Notes key={3} {...formData} updateForm={updateForm} />,
	]);

	return (
		<Modal
			open={modalState}
			setOpen={closeModal}
			className="h-full w-full p-4 flex md:flex-row flex-col gap-4 max-w-4xl md:h-5/6  bg-neutral-900/75 overflow-hidden"
		>
			<Container className="p-10 flex md:flex-col items-center md:justify-normal justify-center gap-4 ">
				{MultiFormSteps.map((step, i) => {
					return (
						<div key={i} className="group flex md:gap-3 items-center cursor-pointer " onClick={() => goToStep(i)}>
							<div
								className={`${
									currentStepNumber == i ? 'bg-neutral-600' : ''
								} w-10 h-10 flex items-center justify-center bg-neutral-500 rounded-full border border-neutral-400 group-hover:bg-neutral-600 transition-colors duration-100`}
							>
								{i + 1}
							</div>
							<div className="hidden flex-col justify-center md:flex md:w-36">
								<Paragraph size={'xs'} className="text-neutral-400 font-bold">
									Step {i + 1}
								</Paragraph>
								<Paragraph size={'sm'} className="text-neutral-300">
									{step}
								</Paragraph>
							</div>
						</div>
					);
				})}
				<Button variant={'link'} size={'sm'} className="absolute bottom-2" onClick={() => closeModal(false)}>
					Close
				</Button>
			</Container>
			<div className="flex flex-col w-full h-full gap-4 overflow-scroll ">
				<Container className="p-4 h-full flex flex-col justify-between overflow-scroll">
					<div>
						<Paragraph className="font-bold flex m-0 justify-between">
							{MultiFormSteps[currentStepNumber]} <span className="self-end">{formData.scout}</span>
						</Paragraph>
						<Paragraph size={'sm'} className="font-bold flex m-0">
							Match {formData.match} <Dot /> Team {formData.team}
						</Paragraph>

						<div className="py-4 flex flex-col gap-4">{currentStep}</div>
					</div>
					<div className="flex justify-between md:hidden">
						<Button variant={'link'} size={'sm'} className={`${isFirstStep ? 'invisible' : ''}`} onClick={() => backwards()}>
							Go Back
						</Button>
						{isLastStep ? (
							<Button onClick={() => console.log('submit')}>Submit</Button>
						) : (
							<Button onClick={() => forwards()}>Next</Button>
						)}
					</div>
				</Container>
				<Container className="p-4 md:flex justify-between hidden">
					<Button onClick={() => backwards()} variant={'link'} size={'sm'} className={`${isFirstStep ? 'invisible' : ''}`}>
						Go Back
					</Button>
					{isLastStep ? (
						<Button onClick={() => console.log('submit')}>Submit</Button>
					) : (
						<Button onClick={() => forwards()}>Next</Button>
					)}
				</Container>
			</div>
		</Modal>
	);
};

export { Form };
