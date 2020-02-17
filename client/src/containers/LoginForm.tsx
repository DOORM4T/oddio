import React, { useEffect } from 'react'
import Form, { Field } from '../components/Form'
import { decode } from 'jsonwebtoken'

export default function LoginForm() {
	useEffect(() => {
		console.log(decode(document.cookie.slice('authToken='.length)))
	}, [])

	const fields: Field[] = [
		{
			name: 'email',
			placeholder: 'email',
			type: 'email',
			required: true,
		},
		{
			name: 'password',
			placeholder: 'password',
			type: 'password',
			required: true,
		},
	]

	return (
		<Form
			action="/auth/login"
			fields={fields}
			method="POST"
			submitText="Login"
			redirect="/"
		/>
	)
}

interface LoginFormState {
	email: string
	password: string
}
