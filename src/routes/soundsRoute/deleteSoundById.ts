import { Router, Request, Response, NextFunction } from 'express'
import { ObjectId, MongoError } from 'mongodb'
import SoundsModel from '../../models/SoundsModel'

/**
 * @route   /sounds/:id
 * @method  DELETE
 * @desc    Delete a sound and its corresponding upload by ID
 * @access  Validation Required
 */
const router = Router()

router.delete(
	'/:id',
	async (req: Request, res: Response, next: NextFunction) => {
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
)

export default router
