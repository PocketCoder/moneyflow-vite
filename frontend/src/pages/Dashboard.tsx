import {useContext} from 'react';
import UserContext from '../lib/UserContext';
import PrefContext from '../lib/PrefContext';

import {valueFormatter} from '../lib/functions';
import ProgressBar from '../components/dashboard/ProgressBar';
import NetWorthDonut from '../components/dashboard/NetWorthDonut';
import NetWorthChart from '../components/dashboard/NetWorthChart';
import {Title, Metric} from '@tremor/react';

export default function Dashboard() {
	const {userData} = useContext(UserContext);
	const {preferences: prefs} = useContext(PrefContext);
	const len = userData.netWorth[prefs.year].length;
	const nw = userData.netWorth[prefs.year][len - 1].amount;
	const goal = userData.prefs['goal'][prefs.year];
	return (
		<main className="p-6 min-h-full h-full w-full mb-16">
			<h1 className="text-2xl">Dashboard</h1>
			<div className="flex flex-wrap justify-start items-center mt-4 mb-20">
				<div className="flex justify-evenly items-center my-4 w-full">
					<div>
						<Metric>{valueFormatter(nw)}</Metric>
						<Title>Total Net Worth</Title>
					</div>
					<div>
						<Metric>£XX,XXX</Metric>
						<Title>Touchable Total</Title>
					</div>
				</div>
				<div className="flex justify-evenly items-center my-4 w-full">
					<ProgressBar start={25000} goal={goal} curr={nw} />
					<NetWorthDonut data={userData.accounts} year={prefs.year} />
				</div>
				<div className='flex-col my-4 mx-auto w-10/12 h-auto"'>
					<NetWorthChart />
				</div>
			</div>
		</main>
	);
}
