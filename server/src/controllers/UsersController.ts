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
			res.status(500).json({ message: 'Unable to get public list of users.' })
			next(error)
		}
	}

	/**
	 * @route   /api/users/:username
	 * @method  GET
	 * @desc    Get user by username
	 * @access  Public
	 */
	static async getUserByUsername(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const username = req.params.username.toUpperCase()
			const users = await UsersModel.findUserByUsername(username)
			res.json(users)
		} catch (error) {
			if (error instanceof MongoError)
				res.status(500).json({ message: 'Unable to get user.' })
			else res.status(400).send({ message: 'User does not exist' })
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
			req.body.username = req.body.username.toUpperCase()
			req.body.email = req.body.email.toUpperCase()

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

			res.json({ message: error.message })
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
			req.cookies = ''
			let { email, password } = req.body
			email = email.toUpperCase()

			let user = await UsersModel.findUserByFields({
				email,
			})

			if (!user) throw new Error('User with provided email does not exist.')

			const passwordIsValid = await compare(password, user.password)

			if (!passwordIsValid) throw new Error('Invalid password.')

			const secret = process.env.JWT_SECRET || ''
			const jwt = sign({ email: user.email, username: user.username }, secret, {
				algorithm: 'HS256',
				expiresIn: '24h',
			})

			res
				.cookie('authToken', jwt, {
					maxAge: 1000 * 60 * 60 * 24,
					httpOnly: true,
				})
				.cookie('user', user.username, {
					maxAge: 1000 * 60 * 60 * 24,
				})
				.json({ message: `logged in as ${user.username}` })
		} catch (error) {
			if (error instanceof MongoError) res.status(500).send(error.message)
			else res.status(400).json({ message: 'Invalid email and/or password.' })
			next(error)
		}
	}

	/**
	 * @route   /auth/logout
	 * @method  DELETE
	 * @desc    Logout a user
	 * @access  Validation Required
	 */
	static logoutUser(req: Request, res: Response, next: NextFunction) {
		try {
			res
				.clearCookie('authToken')
				.clearCookie('user')
				.json({ message: 'Logged out user successfully' })
		} catch (error) {
			res.status(400).json({ message: 'Unable to logout.' })
			next(error)
		}
	}

	/**
	 * @route   /auth/deleteuser
	 * @method  DELETE
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
			res.clearCookie('authToken').json(result)
		} catch (error) {
			res.status(400).json({ message: 'Unable to delete user account.' })
			next(error)
		}
	}

	/**
	 * @route   /users/:username/soundboards/create
	 * @method  POST
	 * @body 	soundboardName:string
	 * @desc    Creates a soundboard
	 * @access  Validation Required
	 */
	static async createSoundboard(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const email = res.locals.userEmail
			const name = req.body.soundboardName

			if (!name) throw new Error('No name provided')

			const created = await UsersModel.createSoundboard(email, name)
			if (!created)
				throw new MongoError('Failed to add soundboard to user data')

			return res.json({ message: `Created soundboard: ${name}` })
		} catch (error) {
			if (error instanceof MongoError) res.status(500)
			else res.status(400)
			res.json({ message: error.message })
			next(error)
		}
	}

	/**
	 * @route   /users/:username/soundboards/:soundboardId/addsound
	 * @method  PUT
	 * @body 	soundId:string
	 * @desc    Creates a soundboard
	 * @access  Validation Required
	 */
	static async addSoundToSoundboard(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const email = res.locals.userEmail
			const soundboardId = req.params.soundboardId
			const soundId = req.body.soundId

			if (!soundboardId) throw new Error('No soundboardId provided.')
			if (!soundId) throw new Error('No sound ID provided.')

			const created = await UsersModel.addSoundToSoundboard(
				email,
				soundboardId,
				soundId
			)
			if (!created) throw new MongoError('Failed to add sound to soundboard.')

			return res.json({
				message: `Added sound ${soundId} to soundboard.`,
			})
		} catch (error) {
			if (error instanceof MongoError) res.status(500)
			else res.status(400)
			res.json({ message: error.message })
			next(error)
		}
	}

	/**
	 * @route   /users/:username/soundboards/:soundboardId
	 * @method  GET
	 * @desc    Creates a soundboard
	 * @access  Validation Required
	 */
	static async getSoundboardById(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const email = res.locals.userEmail
			const soundboardId = req.params.soundboardId
			if (!soundboardId) throw new Error('No soundboardId provided.')

			const soundboard = await UsersModel.getSoundboardById(email, soundboardId)
			if (!soundboard) throw new MongoError('Failed to get soundboard.')

			return res.json(soundboard)
		} catch (error) {
			if (error instanceof MongoError) res.status(500)
			else res.status(400)
			res.json({ message: error.message })
			next(error)
		}
	}

	/**
	 * @route   /users/:username/soundboards/:soundboardId/deletesound
	 * @method  DELETE
	 * @body 	soundId:string
	 * @desc    Deletes a sound by its ID from a soundboard
	 * @access  Validation Required
	 */
	static async deleteSoundFromSoundboard(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const email = res.locals.userEmail
			const soundboardId = req.params.soundboardId
			const soundId = req.body.soundId

			if (!soundboardId) throw new Error('No soundboardId provided.')
			if (!soundId) throw new Error('No sound ID provided.')

			const created = await UsersModel.deleteSoundFromSoundboard(
				email,
				soundboardId,
				soundId
			)
			if (!created)
				throw new MongoError('Failed to delete sound from soundboard.')

			return res.json({
				message: `Deleted sound ${soundId} from soundboard.`,
			})
		} catch (error) {
			if (error instanceof MongoError) res.status(500)
			else res.status(400)
			res.json({ message: error.message })
			next(error)
		}
	}

	/**
	 * @route   /users/:username/soundboards/:soundboardId/deletesoundboard
	 * @method  DELETE
	 * @desc    Deletes a user's soundboard by ID
	 * @access  Validation Required
	 */
	static async deleteSoundboard(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const email = res.locals.userEmail
			const soundboardId = req.params.soundboardId

			if (!soundboardId) throw new Error('No soundboardId provided.')

			const created = await UsersModel.deleteSoundboard(email, soundboardId)
			if (!created)
				throw new MongoError('Failed to delete sound from soundboard.')

			return res.json({
				message: `Deleted soundboard ${soundboardId}.`,
			})
		} catch (error) {
			if (error instanceof MongoError) res.status(500)
			else res.status(400)
			res.json({ message: error.message })
			next(error)
		}
	}
}
