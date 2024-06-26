export async function fetchAccounts(userID: string, token: string) {
	try {
		const response = await fetch(`${process.env.VITE_SERVER}/accounts/${userID}`, {
			method: 'GET',
			cache: 'default',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`
			}
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		// Handle errors
		console.error('Error:', error);
		throw new Error(error);
	}
}

export async function pushNewPreferences(id: string, preferences: object, token: string) {
	const dataPackage = {
		id: id,
		newPrefs: preferences
	};
	try {
		const res = await fetch(`${process.env.VITE_SERVER}/preferences/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`
			},
			body: JSON.stringify(dataPackage)
		});

		if (!res.ok) {
			throw new Error(`HTTP error! Status: ${res.status}`);
		}
		const data = res.json();
		return data;
	} catch (error) {
		console.error('Error: ', error);
		throw new Error(error);
	}
}

export async function getUserByAuthID(authID: string, token: string) {
	try {
		const res = await fetch(`${process.env.VITE_SERVER}/authID/${authID}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`
			}
		});

		if (!res.ok) {
			throw new Error(`HTTP error! Status: ${res.status}`);
		}
		const data = await res.json();
		return data;
	} catch (error) {
		// Handle errors
		console.error('Error:', error);
		throw new Error(error);
	}
}

export async function updateAccounts(data: object, token: string) {
	console.log(data);
	try {
		const res = await fetch(`${process.env.VITE_SERVER}/accounts/${data.id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`
			},
			body: JSON.stringify(data)
		});
		const result = await res.json();
		if (!result.success) {
			throw new Error(result.error);
		} else {
			return {success: true};
		}
	} catch (error) {
		// Handle errors
		console.error('Error:', error);
		throw new Error(error);
	}
}

export async function pushNewAccounts(data: object, token: string) {
	try {
		const res = await fetch(`${process.env.VITE_SERVER}/accounts/add/${data.id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`
			},
			body: JSON.stringify(data)
		});
		const result = await res.json();
		if (!result.success) {
			throw new Error(result.error);
		} else {
			return {success: true};
		}
	} catch (error) {
		// Handle errors
		console.error('Error:', error);
		throw new Error(error);
	}
}

export async function pushNewTags(id: string, account: object, token: string) {
	const data = {
		account,
		user: id
	};
	try {
		const res = await fetch(`${process.env.VITE_SERVER}/tags/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`
			},
			body: JSON.stringify(data)
		});
		const result = await res.json();
		if (!result.success) {
			throw new Error(result.error);
		} else {
			return {success: true};
		}
	} catch (error) {
		console.error('Error:', error);
		throw new Error(error);
	}
}

export async function setUpNewUser(user: any, token: string) {
	try {
		const res = await fetch(`${process.env.VITE_SERVER}/user/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`
			},
			body: JSON.stringify(user)
		});
		const result = await res.json();
		if (!result.success) {
			throw new Error(result.error);
		} else {
			return result;
		}
	} catch (error) {
		console.log('Error:' + error);
		throw new Error(error);
	}
}

export async function pushNewGoal(data: object, token: string) {
	try {
		const res = await fetch(`${process.env.VITE_SERVER}/preferences`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`
			},
			body: JSON.stringify(data)
		});
		const result = await res.json();
		if (!result.success) {
			throw new Error(result.error);
		} else {
			return result;
		}
	} catch (error) {
		console.log('Error: ' + error);
		throw new Error(error);
	}
}
