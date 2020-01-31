import { NextFunction, Request, Response } from 'express'
import soundSchema, { Sound } from '../models/schemas/soundSchema'
import SoundsModel from '../models/SoundsModel'
import { MongoError, ObjectId } from 'mongodb'

export default class SoundsController {
	/**
	 * @route	/sounds/add
	 * @method	POST
	 * @desc	Upload sound data & the associated sound file to MongoDB
	 * @access	Validation Required
	 */
	static async addSound(req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.file) throw new Error('No sound file was uploaded.')

			const validatedSound: Sound = await soundSchema.validate(req.body, {
				stripUnknown: true,
			})

			const uploadedToGridFS = await SoundsModel.uploadSoundToGridFS(
				req.file.buffer,
				validatedSound.sourceId,
				validatedSound.name
			)
			if (!uploadedToGridFS)
				throw new MongoError('Unable to upload sound to GridFS')

			const insertionResult = await SoundsModel.insertSoundJSON(validatedSound)
			return res.json(insertionResult)
		} catch (error) {
			if (error instanceof MongoError) res.status(500)
			else res.status(400)

			res.send(error.message)
			next(error)
		}
	}

	/**
	 * @route   /sounds/:id
	 * @method  DELETE
	 * @desc    Delete a sound and its corresponding upload by ID
	 * @access  Validation Required
	 */
	static async deleteSoundById(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const dataOfSoundToDelete = await SoundsModel.getSoundById(req.params.id)
			if (!dataOfSoundToDelete) throw new Error(`No data for requested sound.`)

			const soundSourceId: ObjectId = dataOfSoundToDelete.sourceId
			const uploadedSoundExists = await SoundsModel.uploadedSoundExistsInGridFS(
				soundSourceId
			)
			if (uploadedSoundExists) {
				const deletedFromGridFS = await SoundsModel.deleteSoundFromGridFSBySourceId(
					soundSourceId
				)
				if (!deletedFromGridFS)
					throw new MongoError('Unable to delete uploaded sound in GridFS.')
			}

			const soundJSONDeletionResult = await SoundsModel.deleteSoundJSONById(
				req.params.id
			)

			res.json(soundJSONDeletionResult)
		} catch (error) {
			if (error instanceof MongoError) res.status(500)
			else res.status(400)
			res.send(
				`Unable to delete sound JSON with ID: ${req.params.id} & its corresponding sound upload, if either exists.`
			)
			next(error)
		}
	}

	/**
	 * @route   /sounds/:id
	 * @method	GET
	 * @desc    Get sound JSON via the _id property.
	 * @access  Public
	 */
	static async getSoundDataById(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const soundJSON = await SoundsModel.getSoundById(req.params.id)
			if (!soundJSON) throw new Error(`No data for requested sound`)
			return res.json(soundJSON)
		} catch (error) {
			res.status(400).send(`Unable to get sound with ID: ${req.params.id}`)
			next(error)
		}
	}

	/**
	 * @route 	/sounds
	 * @method	GET
	 * @desc	Get a paginated list of available sounds
	 * @access	Public
	 */
	static async getSounds(req: Request, res: Response, next: NextFunction) {
		try {
			// TODO: Pagination & Querying
			const sounds = await SoundsModel.getSounds()
			return res.json(sounds)
		} catch (error) {
			res.status(500).send('Unable to get sounds.')
			next(error)
		}
	}

	/**
	 * @route	/sounds/uploads/:sourceId
	 * @method	GET
	 * @desc	Get the audio of an uploaded sound by its source ID
	 * @access	Public
	 */
	static async getUploadedSoundBySourceId(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			res.set('Content-Type', 'audio/mpeg')
			res.set('Accept-Ranges', 'bytes')
			const uploadedSoundExists = await SoundsModel.uploadedSoundExistsInGridFS(
				req.params.sourceId
			)
			if (!uploadedSoundExists)
				throw new Error(`No uploaded sound matches the requested ID.`)

			const downloaded = await SoundsModel.pipeSoundFromGridFSToResponse(
				req.params.sourceId,
				res
			)

			if (!downloaded) throw new MongoError('Unable to get uploaded sound.')

			res.end()
		} catch (error) {
			res.set('Content-Type', 'text/plain')
			if (error instanceof MongoError) res.status(500)
			else res.status(400)
			res.send(`Unable to get uploaded sound with ID: ${req.params.sourceId}.`)
			next(error)
		}
	}

	/**
	 * @route   /sounds/:id
	 * @method  PUT
	 * @desc    Updates an existing sound's JSON data
	 * @access  Validation Required
	 */
	static async updateSoundById(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const previousSoundJSON: {
				[key: string]: any
			} | null = await SoundsModel.getSoundById(req.params.id)
			if (!previousSoundJSON) throw new Error('Sound JSON does not exist.')

			const updatedJSON: { [key: string]: any } = {}
			Object.keys(previousSoundJSON).forEach((key) => {
				updatedJSON[key] =
					req.body[key] !== undefined ? req.body[key] : previousSoundJSON[key]
			})

			const validUpdatedJSON = await soundSchema.validate(updatedJSON, {
				stripUnknown: true,
			})

			const updateResult = await SoundsModel.updateSoundJSONById(
				req.params.id,
				validUpdatedJSON
			)

			res.json(updateResult)
		} catch (error) {
			res.status(400).send('Invalid update data')
			next(error)
		}
	}

	/**
	 * @route   /sounds/uploads/:sourceId
	 * @method  PUT
	 * @desc    Updates an existing sound's JSON data
	 * @access  Validation Required
	 */
	static async updateUploadedSoundBySourceId(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			if (req.file === undefined) throw new Error('No file uploaded.')

			const uploadedSoundExists = await SoundsModel.uploadedSoundExistsInGridFS(
				req.params.sourceId
			)
			if (!uploadedSoundExists)
				throw new Error('Uploaded sound does not exist.')

			const correspondingSoundJSON = await SoundsModel.getSoundBySourceId(
				req.params.sourceId
			)
			if (!correspondingSoundJSON)
				throw new MongoError('Corresponding sound JSON does not exist.')

			// Delete uploaded sound
			const deletedFromGridFS = await SoundsModel.deleteSoundFromGridFSBySourceId(
				req.params.sourceId
			)
			if (!deletedFromGridFS)
				throw new MongoError(
					'Unable to delete uploaded sound stored via GridFS.'
				)

			const soundName = correspondingSoundJSON.name
			const uploaded = await SoundsModel.uploadSoundToGridFS(
				req.file.buffer,
				req.params.sourceId,
				soundName
			)

			if (!uploaded) throw new Error('Failed to upload new sound via GridFS.')

			res.send('Updated uploaded sound successfully.')
		} catch (error) {
			res
				.status(400)
				.send(`Unable to update uploaded sound with ID: ${req.params.sourceId}`)
			next(error)
		}
	}
}
