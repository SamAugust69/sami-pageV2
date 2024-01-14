import { FC, useState } from 'react';
import { Button } from './ui/Button';
import { GrFormAdd } from 'react-icons/gr';
import { REDUCER_ACTION_TYPE } from '@/lib/unsavedReducer';
import { handleExportLog } from '../lib/api';
import { v4 } from 'uuid';

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




	return (

	);
};

export default LogButtons;
