import { Router, Request, Response, NextFunction } from 'express'
import getSoundsCollection from './helpers/getSoundsCollection'
import { ObjectId } from 'mongodb'
import { Sound } from '../../schemas/soundSchema'

/**
 * @route   /sounds/:id
 * @method	GET
 * @desc    Get sound JSON via the _id property.
 * @access  Public
 */
const router = Router()

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id: ObjectId = new ObjectId(req.params.id)
		const data: Sound | null = await getSoundsCollection(req).findOne({
			_id: id,
		})
		if (!data) throw new Error(`No data for requested sound`)
		return res.json(data)
	} catch (error) {
		res.status(400).send(`Unable to get sound with ID: ${req.params.id}`)
		next(error)
	}
})

export default router
