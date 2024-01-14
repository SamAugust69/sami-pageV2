import { cn } from '@/app/lib/utils';
import { HTMLAttributes, Ref, forwardRef, useState } from 'react';
import { Check } from 'lucide-react';
import { VariantProps, cva } from 'class-variance-authority';
import { FC } from 'react';
import Paragraph from './Paragraph';

const InputVariants = cva('peer flex bg-slate-200 disabled:pointer-events-none outline-none rounded-none', {
	variants: {
		variant: {
			default: '',
			purple_ish: 'bg-indigo-100',
			purpler: 'bg-indigo-200',
		},
		size: {
			default: 'h-8 px-1 w-full',
		},
	},
	defaultVariants: {
		size: 'default',
		variant: 'default',
	},
});

interface InputProps extends HTMLAttributes<HTMLInputElement>, VariantProps<typeof InputVariants> {
	disabled?: boolean;
	type: string;
	showIf?: boolean;
	title?: string;
}

const Input: FC<InputProps> = ({ size, variant, showIf, className, title, children, disabled, type, ...props }) => {
	return (
		<div
			className={cn(
				`${
					showIf === false ? 'hidden' : 'block'
				} mx-5 my-3 relative bg-gradient-to-r from-slate-400 to-slate-300 dark:from-slate-400 dark:to-slate-500 pb-0.5`,
				className
			)}
		>
			<input required disabled={disabled} className={cn(InputVariants({ size, variant }))} {...props} />
			<span
				className=" absolute top-0 left-0 peer-focus:text-xs peer-focus:text-slate-500 dark:peer-focus:text-slate-200 peer-focus:-top-2.5 peer-valid:text-xs peer-valid:text-slate-500 dark:peer-valid:text-slate-200 peer-valid:-top-2.5 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-slate-500 dark:peer-placeholder-shown:text-slate-200 peer-placeholder-shown:-top-2.5"
				placeholder=""
			>
				{title}
			</span>
		</div>
	);
};

interface ToggleProps extends HTMLAttributes<HTMLDivElement> {
	toggled: boolean;
	children?: Array<any>;
	disabled?: boolean;
	description?: string;
	showIf?: boolean;
	title?: string;
	hoverColor?: string;
	checkbox?: boolean;
}

const Toggle: FC<ToggleProps> = ({
	showIf,
	description,
	title,
	children,
	toggled,
	disabled,
	className,
	checkbox,
	hoverColor,
	...props
}) => {
	return (
		// <button
		// 	disabled={disabled}
		// 	onClick={onClick}
		// 	className={cn(
		// 		`transition-colors border-2 border-slate-400 dark:border-slate-400 px-2 py-1 rounded ${
		// 			toggled ? 'bg-slate-400 dark:bg-slate-400' : ''
		// 		} ${className}`
		// 	)}
		// 	{...props}
		// >
		// 	{children}
		// </button>mx-5
		<div
			className={cn(
				`mx-5 border ${
					toggled ? `border-indigo-600 ${hoverColor ? hoverColor : 'bg-indigo-100'}` : 'border-slate-400 '
				} rounded p-2 transition-all cursor-pointer ${className} `
			)}
			{...props}
		>
			<div className="flex items-center justify-between">
				{checkbox && (
					<div className="rounded border-2 border-indigo-400 p-1 bg-indigo-300">
						<Check className={`w-5 h-5 text-indigo-800 ${toggled ? 'scale-100' : 'scale-0'}`} />
					</div>
				)}
				<div className="p-1">
					<Paragraph className={`px-0 select-none text-slate-700 font-bold ${checkbox ? 'text-right' : 'text-left'}`}>
						{title}
					</Paragraph>
					<Paragraph className={`px-0 select-none leading-normal ${checkbox ? 'text-right' : 'text-left'}`}>
						{description}
					</Paragraph>
				</div>
			</div>

			{children !== undefined && showIf && (
				<div className=" border-black py-2 px-1 my-2 bg-indigo-200 rounded">
					{children.map((input, i) => {
						return (
							<FormInput key={i} {...input}>
								{input.children}
							</FormInput>
						);
					})}
				</div>
			)}
		</div>
	);
};

interface FormInputProps extends HTMLAttributes<HTMLAllCollection> {
	disabled?: boolean;
	type: string;
}

const formInputSwitch = (type: any, children: any, props: any) => {
	switch (type) {
		case 'text':
			return <Input {...props}>{children}</Input>;
		case 'toggle':
			return <Toggle {...props}>{children}</Toggle>;
		default:
			return <Input {...props}>{children}</Input>;
	}
};

const FormInput: FC<FormInputProps> = ({ children, type, ...props }) => {
	return formInputSwitch(type, children, props);
};

export default FormInput;
