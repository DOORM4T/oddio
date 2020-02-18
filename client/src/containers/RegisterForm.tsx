import React, { RefObject } from 'react'
import Form, { Field } from '../components/Form'

export default function RegisterForm() {
	const fields: Field[] = [
		{
			name: 'username',
			placeholder: 'username',
			type: 'username',
			pattern: '^[\\w\\d_]{3,30}$',
			invalidTitle:
				"3-30 letters and numbers, no special characters except '_'",
			required: true,
		},
		{
			name: 'email',
			placeholder: 'email',
			type: 'email',
			required: true,
		},
		{
			name: 'confirmEmail',
			placeholder: 'confirm email',
			type: 'email',
			required: true,
		},
		{
			name: 'password',
			placeholder: 'password',
			type: 'password',
			pattern:
				'^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&]{6,100}$',
			required: true,
		},
		{
			name: 'confirmPassword',
			placeholder: 'confirm password',
			type: 'password',
			pattern:
				'^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&]{6,100}$',
			required: true,
		},
	]

	const isValid = (
		formRef: RefObject<any>,
		{ email, confirmEmail, password, confirmPassword }: RegisterFormState
	) => {
		const inputs: HTMLInputElement[] = [
			...formRef.current.querySelectorAll('input'),
		]

		// Username			[0]
		// Email 			[1]
		// Email Confirm 	[2]
		// Password 		[3]
		// Password Confirm	[4]
		inputFieldsMatch(inputs[1], inputs[2], 'Email')
		inputFieldsMatch(inputs[3], inputs[4], 'Password')

		return true

		function inputFieldsMatch(
			input1: HTMLInputElement,
			input2: HTMLInputElement,
			field: string
		) {
			if (input1.value !== input2.value) {
				input2.title = `${field} and Confirm ${field} fields do not match`
				input2.pattern = ''
			} else {
				input2.title = ''
				input2.pattern = '.*'
			}
		}
	}

	return (
		<Form
			action="/auth/register"
			fields={fields}
			method="POST"
			submitText="Create Account"
			formIsValid={isValid}
			redirect="/login"
		/>
	)
}

interface RegisterFormState {
	username: string
	email: string
	confirmEmail: string
	password: string
	confirmPassword: string
}
