import { Router } from 'express'
import SoundsController from '../controllers/SoundsController'
import uploadedSoundMiddleware from './middleware/uploadedSoundMiddleware'
import validationMiddleware from './middleware/validationMiddleware'
const router = Router()

router.get('/', SoundsController.getSounds)
router.get('/:id', SoundsController.getSoundDataById)
router.get('/uploads/:sourceId', SoundsController.getUploadedSoundBySourceId)

router.post('/add', uploadedSoundMiddleware, SoundsController.addSound)
router.put(
	'/uploads/:sourceId',
	uploadedSoundMiddleware,
	SoundsController.updateUploadedSoundBySourceId
)
router.put('/:id', SoundsController.updateSoundById)

router.delete('/:id', SoundsController.deleteSoundById)

export default router
