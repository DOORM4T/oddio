import { User } from '../util/types/User.type'
import { Sound } from '../util/types/Sound.type'

export type GlobalStateAction = {
	type: string
	payload: any
}

export function setUserAction(userData: User): GlobalStateAction {
	return {
		type: 'SET_USER',
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

export function setSoundsSearchQueryAction(queryString: string) {
	return {
		type: 'SET_SOUNDS_QUERY',
		payload: queryString,
	}
}

export function setSoundsToLivePlayAction(sounds: Sound[]) {
	return {
		type: 'SET_SOUNDS_TO_LIVE_PLAY',
		payload: sounds,
	}
}
