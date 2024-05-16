import { useEffect, useState } from 'react';

const usePagination = (elementsPerPage: number, data: Array<any>) => {
	const [currentPage, setCurrentPage] = useState(0);
	const [splitData, setSplitData] = useState<Array<Array<any>>>([]);
	const [dataa, setData] = useState<Array<any>>(structuredClone(data));

	useEffect(() => {
		var arr = [];

		for (var i = 0; i < dataa.length; i += elementsPerPage) {
			arr.push(dataa.slice(i, i + elementsPerPage));
		}

		console.log(arr);
		setSplitData(arr);
	}, [dataa]);

	useEffect(() => {
		setData(data);
	}, [data]);

	const goToStep = (step: number) => {
		setCurrentPage(step);
	};

	const forwards = () => {
		if (currentPage == splitData.length - 1) return;
		setCurrentPage(currentPage + 1);
	};

	const backwards = () => {
		if (currentPage == 0) return;
		setCurrentPage(currentPage - 1);
	};

	return {
		currentPage: splitData[currentPage],
		numButtons: splitData.length,
		goToStep,
		currentStep: currentPage,
		forwards,
		backwards,
		isFirst: currentPage == 0,
		isLast: currentPage == splitData.length,
	};
};

export { usePagination };
