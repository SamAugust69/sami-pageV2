import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './styles/globals.css';
import Navbar from '@/components/Navbar';

const roboto = Roboto({ weight: ['100', '300', '400', '500', '700', '900'], subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="">
			<body className={`${roboto.className} bg-g-200 h-full min-h-screen p-4 gap-4 flex`}>
				{children}
			</body>
		</html>
	);
}
