import { Router, Request, Response, NextFunction } from 'express'
import multer from 'multer'
import soundSchema, { Sound } from '../../models/schemas/soundSchema'
import { MongoError } from 'mongodb'
import SoundsModel from '../../models/SoundsModel'

/**
 * @route	/sounds/add
 * @method	POST
 * @desc	Upload sound data & the associated sound file to MongoDB
 * @access	Validation Required
 */
const router = Router()
const uploadMiddleware = multer({
	limits: { files: 1 },
}).single('uploadedSound')

// Data is from a multi-part form that includes a sound file
router.post(
	'/add',
	uploadMiddleware,
	async (req: Request, res: Response, next: NextFunction) => {
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
)

export default router
