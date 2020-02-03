import UsersModel from '../models/UsersModel'
import { Request, Response, NextFunction } from 'express'
import { MongoError, ObjectId } from 'mongodb'
import userSchema, { User } from '../models/schemas/userSchema'
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
	 * @route   /auth/register
	 * @method  POST
	 * @desc    Register a new user
	 * @access  Public
	 */
	static async registerUser(req: Request, res: Response, next: NextFunction) {
		try {
			let existingUser = await UsersModel.findUserByFields({
				username: req.body.username,
			})
			if (existingUser) throw new Error('Username already taken.')

			existingUser = await UsersModel.findUserByFields({
				email: req.body.email,
			})
			if (existingUser)
				throw new Error(
					`An account using the email ${req.body.email} already exists.`
				)

			req.body._id = new ObjectId()
			const validatedUserData: User = await userSchema.validate(req.body, {
				stripUnknown: true,
			})

			const insertionResult = await UsersModel.addUser(validatedUserData)
			res.json(insertionResult)
		} catch (error) {
			if (error instanceof MongoError) res.status(500)
			else res.status(400)

			res.send(error.message)
			next(error)
		}
	}

	/**
	 * @route   /auth/login
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
			const jwt = sign({ email: user.email, username: user.username }, secret, {
				algorithm: 'HS256',
				expiresIn: '24h',
			})

			res
				.cookie('authToken', jwt, { maxAge: 60 * 60 * 24, httpOnly: true })
				.render('pages/index', { message: 'success' })
		} catch (error) {
			if (error instanceof MongoError) res.status(500).send(error.message)
			else res.status(400).send('Invalid email and/or password.')
			next(error)
		}
	}

	/**
	 * @route   /auth/logout
	 * @method  POST
	 * @desc    Logout a user
	 * @access  Validation Required
	 */
	static logoutUser(req: Request, res: Response, next: NextFunction) {
		try {
			res
				.clearCookie('authToken')
				.render('pages/index', { message: 'Logged out successfully.' })
		} catch (error) {
			res.status(400).send('Unable to logout.')
			next(error)
		}
	}

	/**
	 * @route   /auth/deleteuser
	 * @method  POST
	 * @desc    Delete a user
	 * @access  Validation Required
	 */
	static async deleteUser(req: Request, res: Response, next: NextFunction) {
		try {
			const email = res.locals.userEmail
			const password = req.body.password
			if (!email || !password)
				throw new Error('A valid email and password are required.')

			const result = await UsersModel.deleteUser(email, password)
			res.json(result)
		} catch (error) {
			res.status(400).send('Unable to delete user account.')
			next(error)
		}
	}
}
