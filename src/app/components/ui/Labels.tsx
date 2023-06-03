import { FC, HTMLAttributes } from "react";
import Paragraph from "./Paragraph";
import { cn } from "@/lib/utils";

interface EditableLabelProps extends HTMLAttributes<HTMLInputElement> {
	label: string;
	disabled?: boolean;
}

const EditableTextLabel: FC<EditableLabelProps> = ({
	label,
	onChange,
	placeholder,
	className,
	disabled,
}) => {
	return (
		<Paragraph
			size="sm"
			className={cn(`m-0 text-left text-slate-500 flex`, className)}
		>
			{label}
			<span className="pl-1 m-0 text-left font-semibold text-slate-700 dark:text-slate-200">
				{/* {typeof data.info.team[0] === "string" ? data.info.team : "N/A"} */}
				<input
					disabled={disabled}
					className={"bg-transparent w-10 outline-none"}
					type="text"
					placeholder={
						placeholder === undefined ||
						placeholder === "" ||
						placeholder === "0"
							? "N/A"
							: placeholder
					}
					onChange={onChange}
				/>
			</span>
		</Paragraph>
	);
};

interface LabelProps extends HTMLAttributes<HTMLParagraphElement> {
	label: string;
	value: any;
}

const TextLabel: FC<LabelProps> = ({ label, value, className }) => {
	return (
		<Paragraph
			size="sm"
			className={cn(`m-0 text-left text-slate-500 flex`, className)}
		>
			{label}
			<span className="pl-1 m-0 text-left font-semibold text-slate-700 dark:text-slate-200">
				{/* {typeof data.info.team[0] === "string" ? data.info.team : "N/A"} */}
				{value === undefined || value === "" || value === "0" ? "N/A" : value}
			</span>
		</Paragraph>
	);
};

export { EditableTextLabel, TextLabel };
