export type GlobalStateAction = {
	type: string
	payload: any
}

export function loginUserAction(username: string): GlobalStateAction {
	return {
		type: 'LOGIN_USER',
		payload: username,
	}
}
