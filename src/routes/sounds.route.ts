import { Router } from 'express'
import SoundsController from '../controllers/SoundsController'
import multer from 'multer'

const router = Router()

router.get('/', SoundsController.getSounds)
router.get('/:id', SoundsController.getSoundDataById)
router.get('/uploads/:sourceId', SoundsController.getUploadedSoundBySourceId)

const uploadedSoundMiddleware = multer({ limits: { files: 1 } }).single(
	'uploadedSound'
)
router.post('/add', uploadedSoundMiddleware, SoundsController.addSound)
router.put(
	'/uploads/:sourceId',
	uploadedSoundMiddleware,
	SoundsController.updateUploadedSoundBySourceId
)
router.put('/:id', SoundsController.updateSoundById)

router.delete('/:id', SoundsController.deleteSoundById)

export default router
