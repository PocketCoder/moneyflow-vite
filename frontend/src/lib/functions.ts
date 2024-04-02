import {fetchAccounts, getUserID, updateAccounts, pushNewAccounts} from './data';

export function valueFormatter(number: number) {
	return `${new Intl.NumberFormat('en-GB', {style: 'currency', currency: 'GBP'}).format(number).toString()}`;
}

export function recalculateNetWorth() {}

export async function getAccounts() {}

export async function getAccountsAndBalances(auth0id: string, token: string) {
	const usrID = await getUserID(auth0id, token);
	const accountArr = [];
	let accounts;
	try {
		accounts = await fetchAccounts(usrID, token);
		// Handle the data here
	} catch (error) {
		// Handle errors
		console.error('Error fetching accounts:', error);
	}
	let allYears: string[] = [];
	let nw: number;
	for (const account of accounts) {
		if (account.name === 'Net Worth') {
			const sortedArray = account.balances.sort(
				(a: {date: string}, b: {date: string}) => new Date(b.date) - new Date(a.date)
			);
			const mostRecentAmount = sortedArray[0].amount;
			nw = parseFloat(mostRecentAmount);
		}
		const balances = account.balances;
		const years = {};
		for (const balance of balances) {
			const date = new Date(balance.date);
			const year = date.getFullYear();
			if (!years[year]) {
				years[year] = [];
			}

			if (!allYears.includes(year.toString())) {
				allYears.push(year.toString());
			}

			years[year].push(balance);
		}
		const item = {
			name: account.name,
			type: account.type,
			parent: account.parent,
			years: years
		};
		accountArr.push(item);
	}
	return {accountArr, allYears, nw};
}

export function getUniqueBanks(accounts) {
	const banks: string[] = [];
	for (const account of accounts) {
		if (!banks.includes(account.parent)) {
			banks.push(account.parent);
		}
	}
	return banks;
}

export function sumNetWorth(accounts) {
	let netWorth = 0;
	for (const account of accounts) {
		if (account.type === 'Net Worth') continue;
		account.type === 'Debt' ? (netWorth -= parseFloat(account.balance)) : (netWorth += parseFloat(account.balance));
	}
	netWorth = parseFloat(netWorth.toFixed(2));
	return netWorth;
}

export function formatDate(dateString) {
	try {
		const date = new Date(dateString);
		const formattedDate = new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'short'
		}).format(date);
		return formattedDate;
	} catch (e) {
		console.warn(`formatDate(dateString): dateString: ${dateString}; Error: ${e}`);
		return dateString;
	}
}

export async function pushUpdates(updates, usrData: object, token: string) {
	const netWorthObj = calculateNetWorth(updates, usrData.netWorth);
	const data = {
		id: usrData.id,
		...updates,
		netWorthObj
	};
	try {
		const result = await updateAccounts(data, token);
		if (result.success) {
			return result;
		}
		// Handle the data here
	} catch (error) {
		// Handle errors
		console.error('Error fetching accounts:', error);
	}
}

export async function addNewAccounts(accounts: object[], usrData: object, token: string) {
	// TODO: Add in calculate new net worth
	const data = {
		id: usrData.id,
		accounts: accounts
	};
	try {
		const result = await pushNewAccounts(data, token);
		if (result.success) {
			return result;
		}
		// Handle the data here
	} catch (error) {
		// Handle errors
		console.error('Error adding new accounts:', error);
	}
}

function calculateNetWorth(updates, netWorth) {
	let nw = parseFloat(netWorth);
	for (const a in updates) {
		nw += parseFloat(updates[a].amount);
	}
	console.log(nw);
	return {account: 'Net Worth', parent: 'Net Worth', date: new Date(), amount: nw};
}

export function history(accounts) {
	const netWorth: {date: string; balance: number} = {};
	for (const a of accounts) {
		if (a.name === 'Mum ISA') break;
		if (a.name === 'Deposit (2, 324, W9 3EF)') break;
		// TODO: Add in constants for these values as they didn't change throughout the year so there's only one entry.
		for (const b of a.balanceHistory) {
			if (b.date == undefined) {
				console.log(b);
				break;
			}
			const month = new Date(b.date).getMonth() + 1;
			const year = new Date(b.date).getFullYear();
			const fullDate = `${month}/${year}`;
			const balance = parseFloat(b.balance);
			if (isNaN(balance)) {
				console.error(`Invalid balance for date ${jDate}: ${b.balance}`);
				return;
			}
			if (netWorth[fullDate] === undefined) {
				netWorth[fullDate] = balance;
			} else {
				netWorth[fullDate] += balance;
			}
		}
	}
	// FIXME: Net Worth isn't correct at the end.
	console.log(netWorth);
}

export function calcPercDiff(oldValue, newValue) {
	if (oldValue === 0) {
		throw new Error('Cannot divide by zero.');
	}

	const difference = newValue - oldValue;
	const percentageDifference = (difference / Math.abs(oldValue)) * 100;

	return parseFloat(percentageDifference.toFixed(2));
}