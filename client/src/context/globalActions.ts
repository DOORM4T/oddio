export type GlobalStateAction = {
	type: string
	payload: any
}

export type User = {
	_id: string
	username: string
	soundsFamed: string[]
	sounds: string[]
	private: boolean
	email: string
	joined: string
}

export function loginUserAction(userData: User): GlobalStateAction {
	return {
		type: 'LOGIN_USER',
		payload: userData,
	}
}

export function logoutUserAction(): GlobalStateAction {
	return {
		type: 'LOGOUT_USER',
		payload: null,
	}
}
