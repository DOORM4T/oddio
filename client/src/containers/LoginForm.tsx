import React from 'react'
import Form, { Field } from '../components/Form'

export default function LoginForm() {
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
