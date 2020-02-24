import {
	GridFSBucket,
	Collection,
	GridFSBucketOptions,
	Db,
	ObjectId,
	Cursor,
} from 'mongodb'
import { Readable } from 'stream'
import { Response } from 'express'
import { Sound } from './schemas/soundSchema'
import UsersModel from './UsersModel'

let soundsCollection: Collection, uploadedSoundsBucket: GridFSBucket
export default class SoundsModel {
	static injectDB(db: Db) {
		soundsCollection = db.collection('sounds')

		const gridfsOptions: GridFSBucketOptions = { bucketName: 'uploadedSounds' }
		uploadedSoundsBucket = new GridFSBucket(db, gridfsOptions)
	}

	// COMMON MONGODB DRIVER METHODS
	static async getSounds() {
		const cursor: Cursor = await soundsCollection.find()
		const sounds: Sound[] | null = await cursor.toArray()
		return sounds
	}

	static async getSoundById(id: ObjectId | string) {
		const _id = new ObjectId(id)
		const sound = await this.getSoundByFields({ _id })
		return sound
	}

	static async soundExists(id: ObjectId | string) {
		const sound: Sound | null = await this.getSoundById(id)
		if (!sound) return false
		return true
	}

	static async getSoundBySourceId(id: ObjectId | string) {
		const _id = new ObjectId(id)
		const sound = await this.getSoundByFields({ sourceId: _id })
		return sound
	}

	static async getSoundByFields(fields: Sound | Object) {
		const sound: Sound | null = await soundsCollection.findOne(fields)
		return sound
	}

	static async insertSoundJSON(soundJSON: Sound) {
		soundJSON._id = new ObjectId(soundJSON._id)
		soundJSON.sourceId = new ObjectId(soundJSON.sourceId)
		const result = await soundsCollection.insertOne(soundJSON)
		return result
	}

	static async deleteSoundJSONById(id: ObjectId | string) {
		const _id = new ObjectId(id)
		const deletionResult = await soundsCollection.deleteOne({ _id })
		await UsersModel.removeFromFamedForAllUsers(id)
		await UsersModel.removeFromSoundboardsForAllUsers(id)
		return deletionResult
	}

	static async updateSoundJSONById(id: ObjectId | string, updatedJSON: Sound) {
		const _id = new ObjectId(id)
		const updateResult = await soundsCollection.updateOne(
			{ _id },
			{ $set: updatedJSON }
		)
		return updateResult
	}

	// GRID FS METHODS
	static async uploadedSoundExistsInGridFS(id: ObjectId | string) {
		const _id = new ObjectId(id)
		const cursor = await uploadedSoundsBucket.find({ _id })
		const numFound = await cursor.count()
		const found = numFound > 0
		return found
	}

	static uploadSoundToGridFS(
		buffer: Buffer,
		id: ObjectId | string,
		uploadName: string
	): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const _id = new ObjectId(id)
			const soundUploadStream = uploadedSoundsBucket.openUploadStreamWithId(
				_id,
				uploadName
			)

			const soundDataReadableStream = new Readable()
			soundDataReadableStream.push(buffer)
			soundDataReadableStream.push(null)

			soundDataReadableStream.pipe(soundUploadStream)
			soundDataReadableStream.on('end', () => {
				resolve(true)
			})
			soundDataReadableStream.on('error', (error) => {
				reject(false)
			})
		})
	}

	static pipeSoundFromGridFSToResponse(
		id: ObjectId | string,
		res: Response
	): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const _id = new ObjectId(id)
			const downloadStream = uploadedSoundsBucket.openDownloadStream(_id)
			downloadStream.on('end', () => {
				resolve(true)
			})
			downloadStream.on('error', (error) => {
				resolve(false)
			})
			downloadStream.pipe(res)
		})
	}

	static deleteSoundFromGridFSBySourceId(
		id: ObjectId | string
	): Promise<boolean> {
		const _id = new ObjectId(id)
		return new Promise((resolve, reject) => {
			uploadedSoundsBucket.delete(_id, (error) => {
				if (error) reject(false)
				resolve(true)
			})
		})
	}

	// User interaction
	static async incrementFameById(soundId: ObjectId | string) {
		const _id = new ObjectId(soundId)
		const result = await soundsCollection.updateOne(
			{ _id },
			{ $inc: { fame: 1 } }
		)

		return result.result.nModified > 0
	}

	static async decrementFameById(soundId: ObjectId | string) {
		const _id = new ObjectId(soundId)
		const result = await soundsCollection.updateOne(
			{ _id },
			{ $inc: { fame: -1 } }
		)

		return result.result.nModified > 0
	}
}
