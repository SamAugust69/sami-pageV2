"use client";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import { v4 } from "uuid";
import HorizontalScroll from "./ui/HorizontalScroll";
import { EditableLog } from "./Log";
import { cn } from "../lib/utils";

interface LogsSectionProps extends HTMLAttributes<HTMLDivElement> {
	logsToDisplay: any;
	dispatch: any;
	unsavedLogs: any;
}

const LogsSection: FC<LogsSectionProps> = ({
	logsToDisplay,
	className,
	unsavedLogs,
	dispatch,
}) => {
	const [logs, setLogs] = useState<any>(logsToDisplay);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setLogs(logsToDisplay);
	}, [logsToDisplay]);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<HorizontalScroll className={cn(`flex gap-4 ${className}`)}>
			{isMounted === true && logs != null && logs.length >= 0 ? (
				logs.map((val: any, key: number) => {
					return (
						<EditableLog
							disabledInput={val.disabled}
							unsavedLogs={unsavedLogs}
							dispatch={dispatch}
							data={val}
							key={val.id}
						/>
					);
				})
			) : (
				<div>No Logs Found</div>
			)}
		</HorizontalScroll>
	);
};

export default LogsSection;
