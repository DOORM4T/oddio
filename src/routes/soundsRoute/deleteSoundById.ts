import { Router } from 'express'
import { ObjectId, MongoError, DeleteWriteOpResultObject } from 'mongodb'
import getSoundsCollection from './helpers/getSoundsCollection'
import getGridfsBucket from './helpers/getGridfsBucket'
import { Sound } from '../../schemas/soundSchema'

/**
 * @route   /sounds/:id
 * @method  DELETE
 * @desc    Delete a sound and its corresponding upload by ID
 * @access  Validation Required
 */
const router = Router()

router.delete('/:id', async (req, res, next) => {
	try {
		const id: ObjectId = new ObjectId(req.params.id)
		const dataOfSoundToDelete: Sound | null = await getSoundsCollection(
			req
		).findOne({ _id: id })

		if (!dataOfSoundToDelete) throw new Error(`No data for requested sound.`)

		const soundSourceId: ObjectId = dataOfSoundToDelete.sourceId
		getGridfsBucket(req).delete(soundSourceId, (error) => {
			if (error) throw error
		})

		// Delete sound JSON after successfully deleting the uploaded sound that was stored via GridFS
		const soundJSONDeletionResult: DeleteWriteOpResultObject = await getSoundsCollection(
			req
		).deleteOne({ _id: id })

		res.json(soundJSONDeletionResult)
	} catch (error) {
		if (error instanceof MongoError) res.status(500)
		else res.status(400)
		res.send(
			`Unable to delete sound JSON with ID: ${req.params.id} & its corresponding sound upload, if either exists.`
		)
		next(error)
	}
})

export default router
