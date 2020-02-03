import * as yup from 'yup'
import { ObjectId } from 'mongodb'

const soundSchema = yup.object().shape({
	_id: yup.mixed().required('Value of type ObjectID is required'),
	author: yup.string().required(),
	category: yup.string().default('Miscellaneous'),
	created: yup.date().default(new Date()),
	description: yup
		.string()
		.max(100)
		.default(''),
	fame: yup
		.number()
		.integer()
		.default(0),
	name: yup
		.string()
		.min(1)
		.max(30)
		.default('Untitled Sound'),
	sourceId: yup.mixed().default(new ObjectId()),
	triggers: yup.array().default([]),
})

export type Sound = yup.InferType<typeof soundSchema>
export default soundSchema
