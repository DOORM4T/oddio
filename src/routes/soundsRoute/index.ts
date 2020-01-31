import { Router } from 'express'
import getSounds from './getSounds'
import getUploadedSoundBySourceId from './getUploadedSoundBySourceId'
import getSoundDataById from './getSoundDataById'
import addSound from './addSound'
import deleteSoundById from './deleteSoundById'
import updateSoundById from './updateSound'
import updateUploadedSoundBySourceId from './updateUploadedSoundBySourceId'

const router = Router()

router.use(
	'/',
	getSounds,
	getUploadedSoundBySourceId,
	getSoundDataById,
	addSound,
	deleteSoundById,
	updateSoundById,
	updateUploadedSoundBySourceId
)

export default router
