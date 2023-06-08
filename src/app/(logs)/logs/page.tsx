import { FC } from 'react';
import { Metadata } from 'next';
import LogsDashboard from '@/components/LogsDashboard';

export const metadata: Metadata = {
	title: 'Sami Scouting | Logs',
	description: 'Purpose built scouting app for team 155',
};

interface pageProps {}

const page: FC<pageProps> = () => {
	return (
		<main className="py-16 px-2 flex justify-center flex-wrap w-full overflow-hidden">
			<LogsDashboard />
		</main>
	);
};

export default page;

//TODO:

//SEARCH
//sort by match number
//sort by team number
//reverse order

//OPTIMOZE
//when closed, delete data
//load data in chunks

//FEATURES
//google sheet automation
//add from image(no?)
//save page state

//INFO
//starting pos
//drive train?
