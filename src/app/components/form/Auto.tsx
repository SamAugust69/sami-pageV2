import { formItems } from '@/lib/formTypes';
import FormInput from '@/ui/FormInput';
import { v4 } from 'uuid';
import Heading from '../ui/Heading';
import Paragraph from '../ui/Paragraph';

type stepItems = formItems & {
	updateForm: (item: Partial<formItems>) => void;
	onKeyDown: any;
};

// {
// 	type: 'toggle',
// 	toggled: ,
// 	onClick: () => setTest(!test),
// 	placeholder: 'text',
// },

const Auto = ({ updateForm, onKeyDown, auto }: stepItems) => {
	const formInputs = [
		{
			type: 'toggle',
			onClick: (e: any) =>
				updateForm({
					auto: { ...auto, leftStartingZone: !auto.leftStartingZone },
				}),
			toggled: auto.leftStartingZone,
			className: 'mb-5',
			title: 'Moved',
			description: 'Did the robot move during auto?',
		},
		{
			type: 'toggle',
			onClick: (e: any) =>
				updateForm({
					auto: { ...auto, scored: !auto.scored },
				}),
			toggled: auto.scored,
			className: 'mb-5',
			description: 'Did the robot score during auto?',
			showChildren: auto.scored === true,
			children: [
				{
					type: "",
					variant: "purpler",
					onChange: {...}

				}
				{
					type: 'text',
					onClick: (e: any) => e.stopPropagation(),
					variant: 'purpler',
					onChange: (e: any) =>
						updateForm({
							auto: { ...auto, cubes_scored: Number.isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value) },
						}),
					className: 'mx-2',
					title: 'Cubes Scored',
					placeholder: auto.cubes_scored.toString(),
				},
			],
			title: 'Scored',
		},

		{
			type: 'toggle',
			onClick: (e: any) =>
				updateForm({
					auto: { ...auto, docked: !auto.docked },
				}),
			toggled: auto.docked,
			className: 'mb-5',
			title: 'Docked',
			description: 'Did the robot attempt to dock at the charging station?',
			showIf: auto.docked === true,
			children: [
				{
					type: 'toggle',
					onClick: (e: any) => {
						e.stopPropagation(),
							updateForm({
								auto: { ...auto, engaged_station: !auto.engaged_station },
							});
					},
					toggled: auto.engaged_station,
					hoverColor: 'bg-indigo-200',
					className: 'mx-1 border-0 ',
					title: 'Engaged',
					description: 'Did the robot engage the charging station?',
					checkbox: true,
				},
			],
		},
		{
			type: 'toggle',
			onClick: (e: any) =>
				updateForm({
					auto: { ...auto, left_community: !auto.left_community },
				}),
			toggled: auto.left_community,
			className: 'mb-5',
			title: 'Left Community',
			description: 'Did the robot leave the community during auto?',
		},
	];
	return (
		<div onKeyDown={() => onKeyDown()}>
			<Heading size={"xs"}>Auto</Heading>
			<Paragraph>How'd your robot preform during auto?</Paragraph>
			<div className="py-2">
				{formInputs.map((input: any, i) => {
					return (
						<FormInput key={i} {...input}>
							{input.children}
						</FormInput>
					);
				})}
			</div>
		</div>
	);
};

export default Auto;
