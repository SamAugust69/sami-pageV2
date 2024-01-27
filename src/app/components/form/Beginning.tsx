import { FC } from 'react';
import { formItems } from '@/lib/formTypes';
import FormInput from '@/ui/FormInput';
import Heading from '../ui/Heading';
import Paragraph from '../ui/Paragraph';

type stepItems = formItems & {
	updateForm: (item: Partial<formItems>) => void;
};

const Beginning = ({ updateForm, team, match, scout }: stepItems) => {
	const formInputs = [
		{
			type: 'number',
			onChange: (e: any) => updateForm({ match: Number.isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value) }),
			className: 'mb-5',
			title: 'Match',
			placeholder: match.toString(),
		},
		{
			type: 'number',
			onChange: (e: any) => updateForm({ team: Number.isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value) }),
			className: 'mb-5',
			title: 'Team',
			placeholder: team.toString(),
		},
		{
			type: 'text',
			onChange: (e: any) => updateForm({ scout: e.target.value }),
			className: 'mb-5',
			title: "Scouter's Name",
			placeholder: scout,
		},
	];
	return (
		<div>
			<Heading size={"xs"}>Scouting Info</Heading>
			<Paragraph>Who're you scouting?</Paragraph>
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

export default Beginning;
