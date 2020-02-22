import * as yup from 'yup'
import { ObjectId } from 'mongodb'

const userSchema = yup.object({
	_id: yup.mixed().required('Value of type ObjectID is required'),
	email: yup
		.string()
		.email()
		.required('Please enter a valid email.'),
	joined: yup.date().default(new Date()),
	password: yup
		.string()
		.matches(
			new RegExp(
				/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&]{6,100}$/
			)
		)
		.required('Please enter a valid password.'),
	private: yup.boolean().default(false),
	sounds: yup.array<string>().default([]),
	soundsFamed: yup.array<string>().default([]),
	soundboards: yup.array<Soundboard>().default([]),
	username: yup
		.string()
		.matches(new RegExp(/^[\w\d_]{3,30}$/))
		.required('Please enter a valid username.'),
})

export type User = yup.InferType<typeof userSchema>
export default userSchema

export interface Soundboard {
	_id: ObjectId
	name: string
	sounds: [{ name: string; triggers: string[] }]
}
