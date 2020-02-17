import React from 'react'
import Spacing from '../components/Spacing'
import Header from '../components/Header'
import RegisterForm from '../containers/RegisterForm'
import { Link } from 'react-router-dom'

export default function Account() {
	return (
		<article>
			<Header title="Register" icon="🔐" />
			<Spacing spaces={3} />
			<RegisterForm />
			<div style={redirectStyles}>
				<p style={{ marginRight: '1rem' }}>Already have an account?</p>
				<Link to="/login" style={{ fontWeight: 'bolder', color: 'black' }}>
					Login
				</Link>
			</div>
		</article>
	)
}

const redirectStyles = {
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	marginTop: '1rem',
	fontSize: '1.2rem',
}
