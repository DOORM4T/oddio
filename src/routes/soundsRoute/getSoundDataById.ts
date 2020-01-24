import { Router, Request, Response, NextFunction } from 'express'
import { Sound } from '../../schemas/soundSchema'
import SoundsModel from '../../models/SoundsModel'

/**
 * @route   /sounds/:id
 * @method	GET
 * @desc    Get sound JSON via the _id property.
 * @access  Public
 */
const router = Router()

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const soundJSON = await SoundsModel.getSoundById(req.params.id)
		if (!soundJSON) throw new Error(`No data for requested sound`)
		return res.json(soundJSON)
	} catch (error) {
		res.status(400).send(`Unable to get sound with ID: ${req.params.id}`)
		next(error)
	}
})

export default router
