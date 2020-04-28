import { Router, Request, Response, NextFunction } from 'express'
import soundsRoute from './sounds.route'
import usersRoute from './users.route'

const router = Router()

// router.get('/', (req: Request, res: Response, next: NextFunction) => {
// 	res.render('pages/index')
// })

router.use('/api/sounds', soundsRoute)
router.use('/', usersRoute)

export default router
