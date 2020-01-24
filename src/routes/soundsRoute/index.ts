import { Router } from 'express'
import getSounds from './getSounds'
import getUploadedSoundById from './getUploadedSound'
import getSoundDataByid from './getSoundDataByid'
import addSound from './addSound'
import deleteSoundById from './deleteSoundById'
import updateSoundById from './updateSound'
import updateUploadedSound from './updateUploadedSound'

const router = Router()

router.use(
	'/',
	getSounds,
	getUploadedSoundById,
	getSoundDataByid,
	addSound,
	deleteSoundById,
	updateSoundById,
	updateUploadedSound
)

export default router
