import { FC, HtmlHTMLAttributes, useEffect, useRef } from 'react';

interface DialogProps extends HtmlHTMLAttributes<HTMLDialogElement> {
	visible: boolean;
	setVisible: Function;
}

const Dialog: FC<DialogProps> = ({ children, visible, setVisible }) => {
	const dialogRef = useRef<HTMLDivElement>(null);

	const handleDialogClick = (e: any) => {
		if (visible && !dialogRef.current?.contains(e.target) && !dialogRef.current?.contains(e.target)) {
			setVisible(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mouseup', handleDialogClick);
	});

	return (
		<div
			className={`${
				visible ? 'visible' : 'invisible'
			} w-full h-full fixed top-0 left-0 z-20 bg-slate-600/30 flex items-center justify-center overflow-hidden`}
		>
			<div
				ref={dialogRef}
				className="bg-slate-200 dark:bg-slate-600 border-slate-400 dark:border-slate-800 border-2 rounded p-4"
			>
				{children}
			</div>
		</div>
	);
};

export default Dialog;
