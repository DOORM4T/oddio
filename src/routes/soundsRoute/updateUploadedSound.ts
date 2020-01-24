import { Router, Request, Response, NextFunction } from 'express'
import multer from 'multer'
import { MongoError } from 'mongodb'
import SoundsModel from '../../models/SoundsModel'

const router = Router()
const uploadMiddleware = multer({ limits: { files: 1 } }).single('newSound')

router.put(
	'/uploads/:id',
	uploadMiddleware,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			if (req.file === undefined) throw new Error('No file uploaded.')

			const uploadedSoundExists = await SoundsModel.uploadedSoundExistsInGridFS(
				req.params.id
			)
			if (!uploadedSoundExists)
				throw new Error('Uploaded sound does not exist.')

			const correspondingSoundJSON = await SoundsModel.getSoundBySourceId(
				req.params.id
			)
			if (!correspondingSoundJSON)
				throw new MongoError('Corresponding sound JSON does not exist.')

			// Delete uploaded sound
			const deletedFromGridFS = await SoundsModel.deleteSoundFromGridFSBySourceId(
				req.params.id
			)
			if (!deletedFromGridFS)
				throw new MongoError(
					'Unable to delete uploaded sound stored via GridFS.'
				)

			const soundName = correspondingSoundJSON.name
			const uploaded = await SoundsModel.uploadSoundToGridFS(
				req.file.buffer,
				req.params.id,
				soundName
			)

			if (!uploaded) throw new Error('Failed to upload new sound via GridFS.')

			res.send('Updated uploaded sound successfully.')
		} catch (error) {
			res
				.status(400)
				.send(`Unable to update uploaded sound with ID: ${req.params.id}`)
			next(error)
		}
	}
)

export default router
