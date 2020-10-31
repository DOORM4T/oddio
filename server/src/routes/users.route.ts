import { Router } from 'express'
import UsersController from '../controllers/UsersController'
import validate from './middleware/validationMiddleware'
const router = Router()

// router.get('/', UsersController.getUsers)
router.get('/:username', validate, UsersController.getUserByUsername)

router.post(
	'/:username/soundboards/create',
	validate,
	UsersController.createSoundboard
)
router.put(
	'/:username/soundboards/:soundboardId/addsound',
	validate,
	UsersController.addSoundToSoundboard
)
router.get(
	'/:username/soundboards/:soundboardId',
	validate,
	UsersController.getSoundboardById
)
router.delete(
	'/:username/soundboards/:soundboardId/deletesound',
	validate,
	UsersController.deleteSoundFromSoundboard
)
router.delete(
	'/:username/soundboards/:soundboardId/deletesoundboard',
	validate,
	UsersController.deleteSoundboard
)

export default router
