import { Router, Request, Response, NextFunction } from 'express'
import getSoundsCollection from './helpers/getSoundsCollection'
import { Cursor } from 'mongodb'
import { Sound } from '../../schemas/soundSchema'

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
		const cursor: Cursor = await getSoundsCollection(req).find()
		const data: Sound[] = await cursor.toArray()
		return res.json(data)
	} catch (error) {
		res.status(500).send('Unable to get sounds.')
		next(error)
	}
})

export default router
