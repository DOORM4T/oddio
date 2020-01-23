import * as yup from 'yup'

const userSchema = yup.object({
	email: yup
		.string()
		.email()
		.required('Please enter a valid email.'),
	joined: yup.date().default(new Date()),
	password: yup
		.string()
		.min(6)
		.matches(
			new RegExp(
				/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&]{6,}$/
			)
		)
		.required('Please enter a valid password.'),
	username: yup
		.string()
		.min(3)
		.max(30)
		.matches(new RegExp(/^[\w\d_]{3,}$/))
		.required('Please enter a valid username.'),
})

export type User = yup.InferType<typeof userSchema>
export default userSchema
