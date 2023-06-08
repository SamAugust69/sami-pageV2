import { FC, HTMLAttributes, useState } from 'react';
import { Button } from './ui/Button';
import { REDUCER_ACTION_TYPE } from '@/lib/unsavedReducer';

interface ScoringGridButtonProps extends HTMLAttributes<HTMLButtonElement> {
	buttonInfo: any;
	data: any;
	unsavedLogs: any;
	dispatch: any;
	disabled: boolean;
}

const ScoringGridButton: FC<ScoringGridButtonProps> = ({ buttonInfo, data, unsavedLogs, dispatch, disabled }) => {
	const [active, setActive] = useState(buttonInfo[0][1]);

	const saveInfo = () => {
		if (unsavedLogs.includes(data) === false) {
			console.log('adding');
			dispatch({ type: REDUCER_ACTION_TYPE.ADDED_LOG, payload: data });
		} else {
			console.log('updating');
			dispatch({ type: REDUCER_ACTION_TYPE.UPDATED_LOG, payload: data });
		}
	};

	return (
		<Button
			onClick={() => {
				if (disabled === false) {
					setActive(active === '0' ? '1' : '0');
					active === '0' ? (buttonInfo[0] = `${buttonInfo[0][0]}1`) : (buttonInfo[0] = `${buttonInfo[0][0]}0`);
					saveInfo();
				}
			}}
			size="square_sm"
			variant="unstyled"
			className={`
                ${active === '1' ? 'brightness-100 border-2 border-slate-700 dark:border-slate-100' : 'brightness-90'} 
                ${buttonInfo[0][0] === '0' ? 'bg-purple-400 dark:bg-purple-500' : ''} 
                ${buttonInfo[0][0] === '1' ? 'bg-orange-400 dark:bg-orange-500' : ''} 
                ${buttonInfo[0][0] === '2' ? 'bg-slate-400 dark:bg-slate-500' : ''}
            `}
		/>
	);
};

interface ScoringGridProps {
	grid: any;
	data: any;
	unsavedLogs: any;
	dispatch: any;
	disableInput: boolean;
}

const ScoringGrid: FC<ScoringGridProps> = ({ grid, data, unsavedLogs, dispatch, disableInput }) => {
	return (
		<div className="flex flex-col items-center gap-2">
			{grid.map((row: any, key: number) => {
				return (
					<div key={key} className="flex gap-2">
						{row.map((piece: any, key: number) => {
							return (
								<ScoringGridButton
									key={key}
									disabled={disableInput}
									buttonInfo={piece}
									data={data}
									unsavedLogs={unsavedLogs}
									dispatch={dispatch}
								/>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};

export default ScoringGrid;
