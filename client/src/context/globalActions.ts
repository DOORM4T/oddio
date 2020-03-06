import { User } from '../util/types/User.type'

export type GlobalStateAction = {
	type: string
	payload: any
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

export function setAlertAction(alert: string) {
	return {
		type: 'SET_ALERT',
		payload: alert,
	}
}

export function setSoundsSearchQuery(queryString: string) {
	return {
		type: 'SET_SOUNDS_QUERY',
		payload: queryString,
	}
}
