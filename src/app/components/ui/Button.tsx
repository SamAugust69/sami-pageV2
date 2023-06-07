import { cn } from '@/app/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { ButtonHTMLAttributes, FC, Ref, forwardRef, useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { REDUCER_ACTION_TYPE } from '@/lib/unsavedReducer';

export const buttonVariants = cva(
	'rounded active:scale-95 focus:ring-2 disabled:pointer-events-none inline-flex items-center justify-center text-sm font-medium',
	{
		variants: {
			variant: {
				default: 'bg-slate-400 dark:bg-slate-300 dark:text-slate-900',
				icon: 'bg-slate-300 hover:border-2 border-slate-400 dark:bg-slate-300 dark:text-slate-900',
				link:
					'bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent',
				hidden: 'bg-transparent',
				unstyled: '',
			},
			size: {
				default: 'h-10 py-2 px-4',
				icon: 'h-12 w-12 m-2',
				square_sm: 'h-7 w-7',
				lg: 'h-12 m-2 px-2',
				sm: 'h-8 p-2',
				xs: 'h-6 p-2',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	isLoading?: boolean;
	ref?: Ref<HTMLButtonElement>;
}

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, children, variant, isLoading, size, ...props }, ref) => {
		return (
			<button className={cn(buttonVariants({ variant, size, className }))} ref={ref} disabled={isLoading} {...props}>
				{isLoading ? <Loader2 className="animate-spin p-1" /> : null}
				{children}
			</button>
		);
	}
);

export const iconButtonVariants = cva(
	'rounded active:scale-95 focus:ring-2 disabled:pointer-events-none inline-flex items-center justify-center text-sm font-medium transition-all',
	{
		variants: {
			variant: {
				default: 'hover:border-2 border-slate-400 dark:text-slate-900',
			},
			size: {
				default: 'h-12 w-12 m-2',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof iconButtonVariants> {
	ref?: Ref<HTMLButtonElement>;
}

const IconButton: FC<IconButtonProps> = forwardRef<HTMLButtonElement, IconButtonProps>(
	({ className, children, variant, size, ...props }, ref) => {
		return (
			<button className={cn(iconButtonVariants({ variant, size, className }))} ref={ref} {...props}>
				{children}
			</button>
		);
	}
);

interface ToggleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	toggled: any;
	ref?: Ref<HTMLButtonElement>;
	disabled?: boolean;
}

const ToggleButton: FC<ToggleButtonProps> = forwardRef<HTMLButtonElement, ToggleButtonProps>(
	({ className, children, toggled, onClick, disabled, ...props }, ref) => {
		return (
			<button
				disabled={disabled}
				onClick={onClick}
				className={cn(
					`transition-colors border-2 border-slate-400 dark:border-slate-400 px-2 py-1 rounded ${
						toggled ? 'bg-slate-400 dark:bg-slate-400' : ''
					} ${className}`
				)}
				ref={ref}
				{...props}
			>
				{children}
			</button>
		);
	}
);

Button.displayName = 'Button';
IconButton.displayName = 'IconButton';
ToggleButton.displayName = 'ToggleButton';

export { Button, IconButton, ToggleButton };
