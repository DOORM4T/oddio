import { Router, Request, Response, NextFunction } from 'express'
import { genSalt, hash } from 'bcryptjs'
import userSchema, { User } from '../../schemas/userSchema'
import getUsersCollection from './helpers/getUsersCollection'
import { InsertOneWriteOpResult } from 'mongodb'
const router = Router()

// Sign up
router.post(
	'signup',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const validatedData: User = await userSchema.validate(req.body, {
				stripUnknown: true,
			})
			const salt: string = await genSalt(10)
			validatedData.password = await hash(validatedData.password, salt)

			const insertionResult: InsertOneWriteOpResult<any> = await getUsersCollection(
				req
			).insertOne(validatedData)
			res.json(insertionResult)
		} catch (error) {
			next(error)
		}
	}
)

// Login

// Logout

// Forgot Password

// Forgot Username

export default router
