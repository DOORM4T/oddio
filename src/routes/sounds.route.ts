import { Router } from 'express'
import SoundsController from '../controllers/SoundsController'
import upload from './middleware/uploadedSoundMiddleware'
import validate from './middleware/validationMiddleware'
const router = Router()

router.get('/', SoundsController.getSounds)
router.get('/:id', SoundsController.getSoundDataById)
router.get('/uploads/:sourceId', SoundsController.getUploadedSoundBySourceId)

router.post('/add', validate, upload, SoundsController.addSound)
router.put(
	'/uploads/:sourceId',
	validate,
	upload,
	SoundsController.updateUploadedSoundBySourceId
)
router.put('/:id', validate, SoundsController.updateSoundById)

router.delete('/:id', validate, SoundsController.deleteSoundById)

export default router
