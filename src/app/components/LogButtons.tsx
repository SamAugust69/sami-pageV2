import { FC, useState } from 'react';
import { Button } from './ui/Button';
import { GrFormAdd } from 'react-icons/gr';
import { REDUCER_ACTION_TYPE } from '@/lib/unsavedReducer';
import blankLog from '@/lib/blankLog';
import { handleExportLog } from '../lib/api';

interface LogButtonsProps {
	displayedLogs: any;
	setDisplayedLogs: any;
	localLogs: any;
	setLocalLogs: any;
	dispatch: any;
	unsavedLogs: any;
}

const LogButtons: FC<LogButtonsProps> = ({
	displayedLogs,
	setDisplayedLogs,
	localLogs,
	setLocalLogs,
	dispatch,
	unsavedLogs,
}) => {
	//needs to have the ability to add a new log to local logs, and display it..!!!

	const addNewLog = () => {
		setDisplayedLogs([...displayedLogs, blankLog]);
	};

	const saveLogs = () => {
		var newLogs: any = localLogs;
		console.log('-------------------------');
		console.log(unsavedLogs);
		unsavedLogs.map((val: any) => {
			if (localLogs.some((ele: any) => ele.id === val.id) !== true) {
				console.log(`adding log ${val.info.match}, ${val.info.team}, ${val.id}`);
				newLogs = [...newLogs, val];
				dispatch({ type: REDUCER_ACTION_TYPE.REMOVED_LOG, payload: val });
				console.log(newLogs);
				setLocalLogs(newLogs);
			} else {
				setLocalLogs(
					localLogs.map((item: any) => {
						if (item.id == val.id) {
							dispatch({ type: REDUCER_ACTION_TYPE.REMOVED_LOG, payload: val });
							return val;
						} else {
							return item;
						}
					})
				);
			}
			console.log(localLogs);
		});

		console.log('-------------------------');

		setDisplayedLogs(
			displayedLogs.map((log: any) => {
				if (localLogs.includes(log)) {
					return localLogs.filter((item: any) => item.id === log.id)[0];
				} else {
					return log;
				}
			})
		);
	};

	const [loading, setLoading] = useState(false);

	return (
		<div className="flex items-center justify-center">
			<Button size="icon" onClick={() => addNewLog()}>
				<GrFormAdd className="w-5 h-5" />
			</Button>
			<Button size="lg" onClick={() => saveLogs()}>
				Save Local Logs
			</Button>
			<Button size="lg" onClick={() => handleExportLog(localLogs, setLoading)} isLoading={loading}>
				Export Local Logs
			</Button>
		</div>
	);
};

export default LogButtons;
