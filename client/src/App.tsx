import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AOS, { AosOptions } from 'aos'
import 'aos/dist/aos.css'
import './main.scss'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

export default function App() {
	useEffect(() => {
		const options: AosOptions = {
			once: true,
			duration: 800,
			easing: 'ease-out',
		}
		AOS.init(options)
	}, [])

	return (
		<Router>
			<Switch>
				<Route exact path="/" render={() => <Home />} />
				<Route path="/dashboard" render={() => <Dashboard />} />
				<Route path="/login" render={() => <Login />} />
				<Route path="/register" render={() => <Register />} />
				<Route path="/*" render={() => <div>404</div>} />
			</Switch>
		</Router>
	)
}
