import { Router, Request, Response, NextFunction } from 'express'
import { MongoError } from 'mongodb'
import SoundsModel from '../../models/SoundsModel'

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
			res.set('Content-Type', 'audio/mpeg')
			res.set('Accept-Ranges', 'bytes')
			const uploadedSoundExists = await SoundsModel.uploadedSoundExistsInGridFS(
				req.params.id
			)
			if (!uploadedSoundExists)
				throw new Error(`No uploaded sound matches the requested ID.`)

			const downloaded = await SoundsModel.pipeSoundFromGridFSToResponse(
				req.params.id,
				res
			)

			if (!downloaded) throw new MongoError('Unable to get uploaded sound.')

			res.end()
		} catch (error) {
			res.set('Content-Type', 'text/plain')
			if (error instanceof MongoError) res.status(500)
			else res.status(400)
			res.send(`Unable to get uploaded sound with ID: ${req.params.id}.`)
			next(error)
		}
	}
)

export default router
