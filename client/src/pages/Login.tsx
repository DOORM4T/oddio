import React from 'react'
import Spacing from '../components/Spacing'
import Header from '../components/Header'
import LoginForm from '../containers/LoginForm'
import { Link } from 'react-router-dom'

export default function Account() {
	return (
		<article>
			<Header title="Login" icon="🔐" />
			<h1 style={{ textAlign: 'center' }}>Welcome back!</h1>
			<LoginForm />
			<div style={toggleSectionStyles}>
				<p style={{ marginRight: '1rem' }}>Don't have an account?</p>
				<Link to="/register" style={{ fontWeight: 'bolder', color: 'black' }}>
					Register
				</Link>
			</div>
		</article>
	)
}

const toggleSectionStyles = {
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	marginTop: '1rem',
	fontSize: '1.2rem',
}
