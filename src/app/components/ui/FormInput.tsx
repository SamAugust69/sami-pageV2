import { cn } from '@/lib/utils';
import { HTMLAttributes, Ref, forwardRef, useState } from 'react';
import { Check } from 'lucide-react';
import { VariantProps, cva } from 'class-variance-authority';
import { FC } from 'react';
import Paragraph from './Paragraph';
import useMultiForm from '@/lib/useMultiForm';
import { Button } from './Button';

const InputVariants = cva(
	'peer flex disabled:pointer-events-none outline-none rounded-none border-2 border-t-100 rounded',
	{
		variants: {
			variant: {
				default: 'bg-transparent text-t-100 placeholder-t-100',
				purple_ish: '',
				purpler: '',
			},
			size: {
				default: 'h-10 px-2 w-full',
			},
		},
		defaultVariants: {
			size: 'default',
			variant: 'default',
		},
	}
);

interface InputProps extends HTMLAttributes<HTMLInputElement>, VariantProps<typeof InputVariants> {
	disabled?: boolean;
	type: string;
	incrementButtons?: boolean;
	increment?: (setThing: Function) => number;
	decrease?: (setThing: Function) => number;
	visible?: boolean;
	title?: string;
}

const TextInput: FC<InputProps> = ({
	size,
	variant,
	visible,
	className,
	title,
	children,
	disabled,
	type,
	...props
}) => {
	return (
		<div className={cn(`${visible === false ? 'hidden' : 'block'} relative bg-gradient-to-r 500 pb-0.5 `, className)}>
			<input
				required
				disabled={disabled}
				className={cn(InputVariants({ size, variant }))}
				onClick={(e: any) => e.stopPropagation()}
				{...props}
			/>
			<span className="text-t-100 disabled:pointer-events-none outline-none text-sm absolute top-0 left-2 peer-focus:text-xs peer-focus:bg-g-200 peer-focus:-top-2 peer-valid:text-xs peer-valid:bg-g-200 peer-valid:-top-2 transition-all peer-placeholder-shown:text-xs  peer-placeholder-shown:-top-2 peer-placeholder-shown:bg-g-200 px-1">
				{title}
			</span>
		</div>
	);
};

const NumberInput: FC<InputProps> = ({
	size,
	variant,
	visible,
	className,
	title,
	children,
	disabled,
	incrementButtons,
	increment,
	decrease,
	type,
	placeholder,
	...props
}) => {

	const [thing, setThing] = useState<number>(parseInt(placeholder!) ?? 0);
	{console.log(thing > 0)}
	return (
		<div className={cn(`${visible === false ? 'hidden' : 'block'}  relative  pb-0.5`, className)}>
			<input
				required
				disabled={disabled}
				pattern="[0-9]*"
				className={cn(InputVariants({ size, variant }))}
				placeholder={thing.toString()}
				{...props}
			/>
			<span className="text-t-100 disabled:pointer-events-none outline-none text-sm absolute top-0 left-2 peer-focus:text-xs peer-focus:bg-g-200 peer-focus:-top-2 peer-valid:text-xs peer-valid:bg-g-200 peer-valid:-top-2 transition-all peer-placeholder-shown:text-xs  peer-placeholder-shown:-top-2 peer-placeholder-shown:bg-g-200 px-1">
				{title}
			</span>
			
			
			{incrementButtons == true ? (
				<div>
					<Button onClick={() => increment?.(setThing)}>+</Button>
					<Button onClick={() => (thing > 0 ? decrease?.(setThing) : thing)}>-</Button>
				</div>
			) : null}

		</div>
	);
};

interface ToggleProps extends HTMLAttributes<HTMLDivElement> {
	toggled: boolean;
	children?: Array<any>;
	disabled?: boolean;
	description?: string;
	showChildren?: boolean;
	title?: string;
	hoverColor?: string;
	checkbox?: boolean;
}

const Toggle: FC<ToggleProps> = ({
	showChildren,
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
		<div
			className={cn(
				`border-2 ${
					toggled ? `border-t-100 bg-t-100/10` : 'border-slate-400'
				} rounded transition-all cursor-pointer ${className}`
			)}
		>
			<div className="flex items-center justify-between p-2 " {...props}>
				{checkbox && (
					<div className="rounded border-2 p-1 border-t-100 bg-t-100/5">
						<Check className={`w-5 h-5 text-t-100 ${toggled ? 'scale-100' : 'scale-0'}`} />
					</div>
				)}
				<div className="p-1">
					<Paragraph className={`px-0 select-none text-t-100 font-bold ${checkbox ? 'text-right' : 'text-left'} mb-0`}>
						{title}
					</Paragraph>
					<Paragraph
						size={'sm'}
						className={`px-0 select-none text-t-200 leading-normal ${checkbox ? 'text-right' : 'text-left'} mb-0`}
					>
						{description}
					</Paragraph>
				</div>
			</div>

			{children !== undefined && toggled && (
				<div className="px-3 py-4 bg-g-200 flex gap-2 flex-col border-t-2 border-t-200">
					{children.map((input, i) => {
						return (
							<FormInput key={i} className="mx-1 border-0 mb-0" {...input}>
								{input.children}
							</FormInput>
						);
					})}
				</div>
			)}
		</div>
	);
};

interface CarouselProps extends HTMLAttributes<HTMLDivElement> {}

const CarouselSelector: FC<CarouselProps> = ({ className }) => {
	return <div className={`bg-indigo-100 ${className}`}>s</div>;
};

// lets make a selector, left and right thingy.
const formInputSwitch = (type: string, children: any, props: any) => {
	switch (type.toLowerCase()) {
		case 'text':
			return <TextInput {...props}>{children}</TextInput>;
		case 'toggle':
			return <Toggle {...props}>{children}</Toggle>;
		case 'number':
			return <NumberInput {...props}>{children}</NumberInput>;
		case 'carousel':
			return <CarouselSelector {...props}></CarouselSelector>;
		default:
			return <TextInput {...props}>{children}</TextInput>;
	}
};

interface FormInputProps extends HTMLAttributes<HTMLAllCollection> {
	disabled?: boolean;
	type: string;
}

const FormInput: FC<FormInputProps> = ({ children, type, ...props }) => {
	return formInputSwitch(type, children, props);
};

export default FormInput;
