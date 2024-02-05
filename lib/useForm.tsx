import { FC, useState } from 'react';

export default function useForm() {
	const [formState, setFormState] = useState(false);

    const toggleOpen = () => {
        setFormState(!formState);
    }

    const setOpen = () => {
        setFormState(true);
    }

    const setClose = () => {
        setFormState(false);
    }

	return {
        formState,
        toggleOpen,
        setOpen,
        setClose,
	};
};
