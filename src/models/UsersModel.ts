import { Db, Collection, ObjectId, MongoError } from 'mongodb'
import { User } from './schemas/userSchema'
import { hash, genSalt, compare } from 'bcryptjs'

let usersCollection: Collection
export default class UsersModel {
	static injectDB(db: Db) {
		usersCollection = db.collection('users')
	}

	static async findUsers() {
		const cursor = await usersCollection.find({ private: false })
		const projection = await cursor.project({
			password: 0,
		})
		const data: User[] = await projection.toArray()
		return data
	}

	static async addUser(userData: User) {
		userData._id = new ObjectId(userData._id)

		const salt = await genSalt(10)
		const hashedPassword = await hash(userData.password, salt)
		userData.password = hashedPassword

		const result = await usersCollection.insertOne(userData)
		return result
	}

	static async findUserByFields(fields: object) {
		const user: User | null = await usersCollection.findOne(fields)
		return user
	}

	static async findUserById(_id: ObjectId | string) {
		if (typeof _id === 'string') _id = new ObjectId(_id)
		const user: User | null = await usersCollection.findOne({ _id })
		return user
	}

	static async deleteUser(email: string, password: string) {
		const user: User | null = await usersCollection.findOne({ email })
		if (!user) throw new Error(`User with email ${email} does not exist.`)

		const passwordIsValid = await compare(password, user.password)
		if (!passwordIsValid) throw new Error('Invalid password.')

		const deleted = await usersCollection.deleteOne({ email })
		return deleted
	}

	static async addSoundToUserSounds(email: string, soundId: ObjectId | string) {
		soundId = new ObjectId(soundId)
		const result = await usersCollection.updateOne(
			{ email },
			{ $push: { sounds: soundId } }
		)
		return result.modifiedCount > 0
	}

	static async deleteSoundFromUserSounds(email: string, soundId: string) {
		const result = await usersCollection.updateOne(
			{ email },
			{ $pull: { sounds: { $in: [new ObjectId(soundId)] } } }
		)
		return result.modifiedCount > 0
	}
}
