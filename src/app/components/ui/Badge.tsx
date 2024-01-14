import { cn } from '@/app/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { FC, HTMLAttributes } from 'react';

type badgeVariantsTypes = 'broke' | 'bad' | 'poor' | 'well' | 'great';

const badgeVariants = cva('rounded border-2 uppercase inline-flex items-center bg-gray-50 font-medium text-gray-600 ', {
	variants: {
		variant: {
			broke: 'bg-zinc-400 border-zinc-500 text-zinc-800',
			bad: 'bg-rose-300 border-rose-400 text-rose-700',
			poor: 'bg-amber-200 border-amber-400 text-amber-700',
			well: 'bg-slate-300 border-slate-400 text-slate-700',
			great: 'bg-emerald-200 border-emerald-400 text-emerald-700',
		},
		size: {
			sm: 'px-2 py-1 text-xs',
			default: 'py-1 px-3 mx-2',
			lg: 'py-2 px-4',
		},
	},
	defaultVariants: {
		variant: 'well',
		size: 'default',
	},
});

interface BadgeProps extends VariantProps<typeof badgeVariants>, HTMLAttributes<HTMLDivElement> {}

const Badge: FC<BadgeProps> = ({ className, size, variant, children, ...props }) => {
	return (
		<span className={cn(badgeVariants({ variant, size }), className)} {...props}>
			{children}
		</span>
	);
};
export { Badge, type badgeVariantsTypes };
