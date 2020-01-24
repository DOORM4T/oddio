import { Router, Request, Response, NextFunction } from 'express'
import SoundsModel from '../../models/SoundsModel'

/**
 * @route 	/sounds
 * @method	GET
 * @desc	Get a paginated list of available sounds
 * @access	Public
 */
const router = Router()

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		// TODO: Pagination & Querying
		const sounds = await SoundsModel.getSounds()
		return res.json(sounds)
	} catch (error) {
		res.status(500).send('Unable to get sounds.')
		next(error)
	}
})

export default router
