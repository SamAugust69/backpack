import { FC, useState } from 'react';

const useMultiForm = (formSteps: Array<React.ReactElement>) => {
	const [formStep, setFormStep] = useState(0);

	const forwards = () => {
		if (formStep == formSteps.length - 1) return;
		console.log('forward');
		setFormStep(formStep + 1);
	};

	const backwards = () => {
		if (formStep == 0) return;
		console.log('back');
		setFormStep(formStep - 1);
	};

	const goToStep = (step: number) => {
		setFormStep(step);
	};

	return {
		formSteps,
		currentStep: formSteps[formStep],
		currentStepNumber: formStep,
		length: formSteps.length,
		forwards,
		backwards,
		goToStep,
		isFirstStep: formStep === 0,
		isLastStep: formStep === formSteps.length - 1,
	};
};

export default useMultiForm;
