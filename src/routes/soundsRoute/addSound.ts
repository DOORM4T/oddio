import { Router, Request, Response, NextFunction } from 'express'
import getGridfsBucket from './helpers/getGridfsBucket'
import getSoundsCollection from './helpers/getSoundsCollection'
import multer from 'multer'
import soundSchema, { Sound } from '../../schemas/soundSchema'
import { Readable } from 'stream'
import {
	MongoError,
	GridFSBucketWriteStream,
	InsertOneWriteOpResult,
} from 'mongodb'

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

			uploadToGridfs(req, validatedSound)
			const insertionResult: InsertOneWriteOpResult<any> = await getSoundsCollection(
				req
			).insertOne(validatedSound)
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

function uploadToGridfs(req: Request, { sourceId, name }: Sound) {
	const uploadStream: GridFSBucketWriteStream = getGridfsBucket(
		req
	).openUploadStreamWithId(sourceId, name)
	const soundDataReadableStream: Readable = new Readable()

	soundDataReadableStream.on('close', () => {
		console.log('finished uploading sound')
	})
	soundDataReadableStream.push(req.file.buffer)
	soundDataReadableStream.push(null)
	soundDataReadableStream.pipe(uploadStream)
}
