import { GlobalStateAction } from './globalActions'

export const initialGlobalState = {
	user: {
		_id: '',
		username: '',
		soundsFamed: [],
		sounds: [],
		private: true,
		email: '',
		joined: '',
	},
	ui: {
		theme: 'default',
		alerts: ['test'],
	},
}

export const globalStateReducer = (
	state: GlobalState,
	action: GlobalStateAction
) => {
	const { type, payload } = action
	switch (type) {
		case 'LOGIN_USER':
			return { ...state, user: payload }
		case 'LOGOUT_USER':
			return { ...state, user: { name: '' } }
		case 'CHANGE_THEME':
			return { ...state, ui: { ...state.ui, theme: payload } }
		default:
			throw new Error()
	}
}

export type GlobalState = typeof initialGlobalState
