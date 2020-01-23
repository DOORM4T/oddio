import { Router, Request, Response, NextFunction } from 'express'
import soundSchema, { Sound } from '../../schemas/soundSchema'
import getSoundsCollection from './helpers/getSoundsCollection'
import { ObjectId, UpdateWriteOpResult } from 'mongodb'

/**
 * @route   /sounds/:id
 * @method  PUT
 * @desc    Updates an existing sound's JSON data
 * @access  Validation Required
 */
const router = Router()
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		console.log(req.body)

		const updatedSoundData: Sound = await soundSchema.validate(req.body, {
			stripUnknown: true,
		})
		const updateResult: UpdateWriteOpResult = await getSoundsCollection(
			req
		).updateOne(
			{ _id: new ObjectId(req.params.id) },
			{ $set: updatedSoundData }
		)
		res.json(updateResult)
	} catch (error) {
		res.status(400).send('Invalid update data')
		next(error)
	}
})

export default router
