import logo from '../../../public/logo.png';

export default function Welcome() {
	return (
		<div className="h-full w-full mt-4">
			<div className="flex justify-start items-center mt-6">
				<img src={logo} className="w-16 mr-4" />
				<h2 className="text-3xl">Welcome to Moneyflow</h2>
			</div>
			<div className="mt-6">
				<h3 className="font-bold text-2xl">Your Financial Overview, Simplified.</h3>
				<p className="mt-1">Get a clear snapshot of your net worth with just a few clicks.</p>

				<h4 className="font-bold text-xl mt-4">Easy Balance Tracking</h4>

				<p className="mt-1">
					Input your account balances effortlessly. No more spreadsheets or complicated calculations.
				</p>

				<h4 className="font-bold text-xl mt-4">Visual Insights</h4>

				<p className="mt-1">
					See your financial data in beautiful charts and graphs. Track your net worth and watch your progress over
					time.
				</p>

				<h4 className="font-bold text-xl mt-4">Get Started</h4>
				<p className="mt-1">Click next to set up your first accounts.</p>
			</div>
		</div>
	);
}
