"use client"
import { FC, useState } from 'react';
import Modal from '@/ui/Modal';
import { Button } from '../ui/Button';
import { formItems } from '@/lib/formTypes';
import { v4 } from 'uuid';

import Auto from '@/components/form/Auto';
import useMultiForm from '@/lib/useMultiForm';
import Teleop from '@/components/form/Teleop';
import Finishing from '@/components/form/Finishing';
import Beginning from './Beginning';

interface FormTestProps {
	label: string
}

const initialValues: formItems = {
	id: v4(),
	completed: false,
	match: 0,
	team: 0,
	scout: 'Sam',
	notes: '',
	bot_preformed: 'well',
	auto: {
		moved: false,
		scored: false,
		left_community: false,
		docked: false,
		engaged_station: false,
		cones_scored: 0,
		cubes_scored: 0,
	},
	teleop: {
		cones_attempted: 0,
		cones_scored: 0,
		cubes_attempted: 0,
		cubes_scored: 0,
		docked: false,
		engaged_station: false,
	},
};

const FormTest: FC<FormTestProps> = ({label}) => {
	const [formData, setFormData] = useState(initialValues);
	const [formVisible, setFormVisible] = useState(true);

	const updateForm = (fieldsToUpdate: Partial<formItems>) => {
		console.log({ ...fieldsToUpdate });
		setFormData({ ...formData, ...fieldsToUpdate });
	};

	const handleKey = (event: any) => {
		if (event.key == "ArrowDown" || event.key == "ArrowRight") forwards()
		if (event.key == "ArrowUp" || event.key == "ArrowLeft") backwards()
	}

	const MultiFormSteps = ['Beginning', 'Auto', 'Teleop', 'Finishing-Up'];

	const handleSubmit = (e: any) => {
		e.preventDefault();
		console.log('submitted');
		console.log(formData);
	};

	const { currentStep, forwards, backwards, goToStep, currentStepNumber, isFirstStep, isLastStep } = useMultiForm([
		<Beginning {...formData} updateForm={updateForm}/>,
		<Auto {...formData} updateForm={updateForm} onKeyDown={handleKey}/>,
		<Teleop {...formData} updateForm={updateForm} />,
		<Finishing {...formData} updateForm={updateForm} />,
	]);


	return (
		<>
			<Button onClick={() => setFormVisible(!formVisible)}>{label}</Button>
			<Modal
				visible={formVisible}
				setVisible={setFormVisible}
				clickOut={true}
				className="bg-slate-300 sm:bg-slate-200 flex flex-col sm:flex-row p-0 relative border-0 w-11/12 max-w-4xl h-5/6"
			>
				<div className="bg-indigo-700 w-full rounded-t sm:rounded h-40 sm:h-full absolute z-0 left-0 top-0 visible sm:invisible"></div>
				<div tabIndex={0} onKeyUp={handleKey} className="flex flex-col sm:flex-row p-4 h-full overflow-scroll w-full max-h-fit">
					<div className="flex flex-row pb-2 sm:flex-col sm:justify-normal justify-center mr-0 sm:mr-6 px-4 py-4 relative bg-indigo-700 rounded">
						{MultiFormSteps.map((step, i) => {
							return (
								<button key={i} onClick={() => goToStep(i)} className="flex p-4 z-10">
									<div
										className={`rounded-full border-2 w-10 h-10 flex items-center justify-center font-semibold text-center transition-colors ${
											currentStepNumber == i
												? 'text-slate-300 border-indigo-400 bg-indigo-950'
												: 'text-slate-400 bg-slate-400/25 border-slate-400'
										}`}
									>
										<p className="w-full">{i + 1}</p>
									</div>
									<div className="flex-col pl-3 hidden sm:flex w-44">
										<p className="text-left font-semibold leading-tight text-sm text-slate-400">Step {i + 1}</p>
										<p className="text-left font-semibold leading-tight uppercase text-slate-300 tracking-wide">{step}</p>
									</div>
								</button>
							);
						})}
						{/* <div className="bg-indigo-700 box-border w-full rounded h-full absolute z-0 left-0"></div> */}
					</div>
					<div className="flex-col justify-between flex w-full">
						<form className="bg-slate-200 rounded p-4 z-10 shadow-lg sm:shadow-none items-center w-full overflow-scroll">
							{currentStep}
						</form>
						{/* form nav w/large screen */}
						<div className="bg-slate-200 hidden justify-between p-4 rounded-b sm:flex">
							<Button
								variant="link"
								className={`font-semibold text-slate-400 h-full ${isFirstStep ? 'invisible' : 'visible'}`}
								onClick={backwards}
							>
								Go Back
							</Button>
							<Button
								className="text-slate-100 bg-indigo-950 h-full"
								onClick={isLastStep ? handleSubmit : forwards}
							>
								{isLastStep ? 'Submit' : 'Next Step'}
							</Button>
						</div>
					</div>
				</div>
				{/* form nav w/small screen */}
				<div className="sm:hidden bg-slate-200 flex justify-between p-4 rounded-b">
					<Button
						variant="link"
						className={`font-semibold text-slate-400 h-full ${isFirstStep ? 'invisible' : 'visible'}`}
						onClick={backwards}
					>
						Go Back
					</Button>
					<Button className="text-slate-100 bg-indigo-950 h-full" onClick={isLastStep ? handleSubmit : forwards}>
						{isLastStep ? 'Submit' : 'Next Step'}
					</Button>
				</div>
			</Modal>
		</>
	);
};

export default FormTest;
