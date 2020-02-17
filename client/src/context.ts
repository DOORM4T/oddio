import { createContext } from 'react'

export interface GlobalStateInterface {
	user: { name: string | null }
	ui: { theme: string; alerts: string[] }
}

export const GlobalContext = createContext<React.Context<
	GlobalStateInterface
> | null>(null)
