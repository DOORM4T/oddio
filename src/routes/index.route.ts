import { Router, Request, Response, NextFunction } from 'express'
import soundsRoute from './sounds.route'

const router = Router()

router.get('/', (req: Request, res: Response, next: NextFunction) => {
	const data: number[] = [1, 2, 3]
	res.render('pages/index', { name: 'Steve', data })
})

router.use('/api/sounds', soundsRoute)

export default router
