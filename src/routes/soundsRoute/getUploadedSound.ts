import { Router, Request, Response, NextFunction } from 'express'
import { ObjectId, GridFSBucketReadStream, MongoError, Cursor } from 'mongodb'
import getGridfsBucket from './helpers/getGridfsBucket'

/**
 * @route	/sounds/uploads/:id
 * @method	GET
 * @desc	Get the audio of an uploaded sound by its source ID
 * @access	Public
 */
const router = Router()

router.get(
	'/uploads/:id',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id: ObjectId = new ObjectId(req.params.id)
			const uploadedSoundsCursor: Cursor = await getGridfsBucket(req).find({
				_id: id,
			})
			const numSoundsWithId = await uploadedSoundsCursor.count()

			if (numSoundsWithId === 0)
				throw new Error(`No uploaded sound matches the requested ID.`)

			const downloadStream: GridFSBucketReadStream = getGridfsBucket(
				req
			).openDownloadStream(id)

			res.set('Content-Type', 'audio/mpeg')
			res.set('Accept-Ranges', 'bytes')

			downloadStream.pipe(res)

			downloadStream.on('end', () => {
				res.end()
			})
		} catch (error) {
			if (error instanceof MongoError) res.status(500)
			else res.status(400)
			res.send(`Unable to get uploaded sound with ID: ${req.params.id}.`)
			next(error)
		}
	}
)

export default router
