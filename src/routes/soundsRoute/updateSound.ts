import { Router, Request, Response, NextFunction } from 'express'
import soundSchema, { Sound } from '../../schemas/soundSchema'
import SoundsModel from '../../models/SoundsModel'

/**
 * @route   /sounds/:id
 * @method  PUT
 * @desc    Updates an existing sound's JSON data
 * @access  Validation Required
 */
const router = Router()
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
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
})

export default router
