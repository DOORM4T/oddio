import { Router } from 'express'
import getSounds from './getSounds'
import getUploadedSoundById from './getUploadedSound'
import getSoundDataById from './getSoundDataById'
import addSound from './addSound'
import deleteSoundById from './deleteSoundById'
import updateSoundById from './updateSound'
import updateUploadedSound from './updateUploadedSound'

const router = Router()

router.use(
	'/',
	getSounds,
	getUploadedSoundById,
	getSoundDataById,
	addSound,
	deleteSoundById,
	updateSoundById,
	updateUploadedSound
)

export default router
