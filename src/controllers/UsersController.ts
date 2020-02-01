import UsersModel from '../models/UsersModel'
import { Request, Response, NextFunction } from 'express'
import { MongoError } from 'mongodb'
import userSchema, { User } from '../models/schemas/userSchema'
import { ValidationError } from 'yup'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

export default class UsersController {
	/**
	 * @route   /api/users
	 * @method  GET
	 * @desc    Get list of public users
	 * @access  Public
	 */
	static async getUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const users = await UsersModel.findUsers()
			res.json(users)
		} catch (error) {
			res.status(500).send('Unable to get public list of users.')
			next(error)
		}
	}

	/**
	 * @route   /register
	 * @method  POST
	 * @desc    Register a new user
	 * @access  Public
	 */
	static async registerUser(req: Request, res: Response, next: NextFunction) {
		try {
			const validatedUserData: User = await userSchema.validate(req.body, {
				stripUnknown: true,
			})

			const insertionResult = await UsersModel.addUser(validatedUserData)
			res.json(insertionResult)
		} catch (error) {
			if (error instanceof MongoError) res.status(500)
			else res.status(400)

			if (error instanceof ValidationError) res.send(error.message)
			else res.send('Failed to register user.')
			next(error)
		}
	}

	/**
	 * @route   /login
	 * @method  POST
	 * @desc    Login a pre-existing user, responding with a session token
	 * @body    {email, password}
	 * @access  Public
	 */
	static async loginUser(req: Request, res: Response, next: NextFunction) {
		try {
			let user = await UsersModel.findUserByFields({
				email: req.body.email,
			})

			if (!user) throw new Error('User with provided email does not exist.')

			const passwordIsValid = await compare(req.body.password, user.password)

			if (!passwordIsValid) throw new Error('Invalid password.')

			const secret = process.env.JWT_SECRET || ''
			const jwt = sign({ email: req.body.email }, secret, {
				algorithm: 'HS256',
				expiresIn: '60s',
			})

			res
				.cookie('authToken', jwt, { maxAge: 60000, httpOnly: true })
				.render('pages/index', { message: 'success' })
		} catch (error) {
			if (error instanceof MongoError) res.status(500).send(error.message)
			else res.status(400).send('Invalid email and/or password.')
			next(error)
		}
	}
}
