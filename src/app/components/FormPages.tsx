import { FC, HTMLAttributes, useEffect, useReducer } from "react";
import Input from "./ui/Input";
import Paragraph from "./ui/Paragraph";
import { Button, ToggleButton } from "./ui/Button";
import ScoringGrid from "./ScoringGrid";
import { unsavedReducer, REDUCER_ACTION_TYPE } from "@/lib/unsavedReducer";

interface FormPagesProps extends HTMLAttributes<HTMLDivElement> {
	data: any;
	unsavedLogs: any;
	dispatch: any;
	disabled: boolean;
}

const AutoPage: FC<FormPagesProps> = ({
	data,
	unsavedLogs,
	dispatch,
	disabled,
}) => {
	const saveInfo = () => {
		if (unsavedLogs.includes(data) === false) {
			console.log("adding");
			dispatch({ type: REDUCER_ACTION_TYPE.ADDED_LOG, payload: data });
		} else {
			console.log("updating");
			dispatch({ type: REDUCER_ACTION_TYPE.UPDATED_LOG, payload: data });
		}
	};

	return (
		<div className="p-2 flex flex-col">
			<div className="mx-4 flex justify-center gap-2 flex-wrap">
				<ToggleButton
					disabled={disabled}
					onClick={() => {
						data.auto.move[0] = !data.auto.move[0];
						saveInfo();
					}}
					toggled={data.auto.move[0]}
				>
					<Paragraph size="sm" className={`m-0 text-slate-600`}>
						Moved
					</Paragraph>
				</ToggleButton>
				<ToggleButton
					disabled={disabled}
					onClick={() => {
						data.auto.leave[0] = !data.auto.leave[0];
						saveInfo();
					}}
					toggled={data.auto.leave[0]}
				>
					<Paragraph size="sm" className={`m-0 text-slate-600`}>
						Leave
					</Paragraph>
				</ToggleButton>
				<ToggleButton
					disabled={disabled}
					onClick={() => {
						data.auto.dock[0] = !data.auto.dock[0];
						saveInfo();
					}}
					toggled={data.auto.dock[0]}
				>
					<Paragraph size="sm" className={`m-0 text-slate-600`}>
						Docked
					</Paragraph>
				</ToggleButton>
				<ToggleButton
					disabled={disabled}
					onClick={() => {
						data.auto.score[0] = !data.auto.score[0];
						saveInfo();
					}}
					toggled={data.auto.score[0]}
				>
					<Paragraph size="sm" className={`m-0 text-slate-600`}>
						Scored
					</Paragraph>
				</ToggleButton>
				<ToggleButton
					disabled={disabled}
					onClick={() => {
						data.auto.engage[0] = !data.auto.engage[0];
						saveInfo();
					}}
					toggled={data.auto.engage[0]}
				>
					<Paragraph size="sm" className={`m-0 text-slate-600`}>
						Engage
					</Paragraph>
				</ToggleButton>
			</div>
			<span className="border-b-2 mx-auto w-72 border-slate-400 rounded my-2"></span>
			<Input
				disabled={disabled}
				onChange={(e: any) => {
					data.auto.cones[0] = parseInt(e.target.value);
					saveInfo();
				}}
				placeholder={data.auto.cones[0]}
			>
				Cones Scored
			</Input>
			<Input
				disabled={disabled}
				onChange={(e: any) => {
					if (disabled === false) {
						data.auto.cubes[0] = parseInt(e.target.value);
						saveInfo();
					}
				}}
				placeholder={data.auto.cubes[0]}
			>
				Cubes Scored
			</Input>

			<Paragraph>Select where the team scored 😃</Paragraph>
			<ScoringGrid
				disableInput={disabled}
				grid={data.auto.scoreLocations}
				data={data}
				unsavedLogs={unsavedLogs}
				dispatch={dispatch}
			/>
		</div>
	);
};

const TeleopPage: FC<FormPagesProps> = ({
	data,
	unsavedLogs,
	dispatch,
	disabled,
}) => {
	const saveInfo = () => {
		if (unsavedLogs.includes(data) === false) {
			console.log("adding");
			dispatch({ type: REDUCER_ACTION_TYPE.ADDED_LOG, payload: data });
		} else {
			console.log("updating");
			dispatch({ type: REDUCER_ACTION_TYPE.UPDATED_LOG, payload: data });
		}
	};

	return (
		<div className="p-2 flex flex-col">
			<div className="mx-4 flex justify-center gap-2 flex-wrap">
				<ToggleButton
					disabled={disabled}
					onClick={() => {
						data.auto.move[0] = !data.auto.move[0];
						saveInfo();
					}}
					toggled={data.auto.move[0]}
				>
					<Paragraph size="sm" className={`m-0 text-slate-600`}>
						Dock
					</Paragraph>
				</ToggleButton>
				<ToggleButton
					disabled={disabled}
					onClick={() => {
						data.auto.leave[0] = !data.auto.leave[0];
						saveInfo();
					}}
					toggled={data.auto.leave[0]}
				>
					<Paragraph size="sm" className={`m-0 text-slate-600`}>
						Engage
					</Paragraph>
				</ToggleButton>
			</div>
			<span className="border-b-2 mx-auto w-72 border-slate-400 rounded my-2"></span>
			<Input
				disabled={disabled}
				onChange={(e: any) => {
					data.teleop.cones[0] = parseInt(e.target.value);
					saveInfo();
				}}
				placeholder={data.teleop.cones[0]}
			>
				Cones Scored
			</Input>
			<Input
				disabled={disabled}
				onChange={(e: any) => {
					data.teleop.conesAttempted[0] = parseInt(e.target.value);
					saveInfo();
				}}
				placeholder={data.teleop.conesAttempted[0]}
			>
				Cones Attempted
			</Input>
			<Input
				disabled={disabled}
				onChange={(e: any) => {
					data.teleop.cubes[0] = parseInt(e.target.value);
					saveInfo();
				}}
				placeholder={data.teleop.cubes[0]}
			>
				Cubes Scored
			</Input>
			<Input
				disabled={disabled}
				onChange={(e: any) => {
					data.teleop.cubesAttempted[0] = parseInt(e.target.value);
					saveInfo();
				}}
				placeholder={data.teleop.cubesAttempted[0]}
			>
				Cubes Attempted
			</Input>

			<Paragraph>Select where the team scored 😃</Paragraph>
			<ScoringGrid
				disableInput={disabled}
				grid={data.teleop.scoreLocations}
				data={data}
				unsavedLogs={unsavedLogs}
				dispatch={dispatch}
			/>
		</div>
	);
};

export { AutoPage, TeleopPage };
