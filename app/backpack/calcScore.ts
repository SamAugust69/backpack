import { LogType } from '@/lib/formTypes';

const calculateScore = (log: LogType) => {
	var teleopScore = 0;
	var autoScore = 0;
	const pointScoring: Array<Array<any>> = [
		[
			{ type: 'boolean', amount: log.auto.leftStartingZone, points: 2 },
			{ type: 'number', amount: log.auto.speakerScore, points: 5 },
			{ type: 'number', amount: log.auto.ampScore, points: 2 },
		],
		[
			{ type: 'number', amount: log.teleop.ampScore, points: 1 },
			{ type: 'number', amount: log.teleop.speakerScore, points: 2 },
			{ type: 'number', amount: log.teleop.amplifiedSpeakerScore, points: 5 },
			{ type: 'boolean', amount: log.teleop.parkOnStage, points: 1 },
			{ type: 'boolean', amount: log.teleop.hangOnChain, points: 3 },
			{ type: 'boolean', amount: log.teleop.hangInHarmony, points: 2 },
			{ type: 'number', amount: log.teleop.trapScore, points: 5 },
		],
	];

	pointScoring[0].map((val) => {
		switch (val.type) {
			case 'boolean':
				val.amount == true ? (autoScore += val.points) : null;
				break;
			case 'number':
				autoScore += val.amount * val.points;
				break;
		}
	});

	pointScoring[1].map((val: any) => {
		switch (val.type) {
			case 'boolean':
				console.log(val.amount);
				val.amount == true ? (teleopScore += val.points) : null;
				break;
			case 'number':
				teleopScore += val.amount * val.points;
				break;
		}
	});

	return { autoScore, teleopScore, total: autoScore + teleopScore };
};

export { calculateScore };
