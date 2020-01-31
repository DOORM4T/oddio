import { Db, Collection, ObjectId } from 'mongodb'
import { User } from './schemas/userSchema'
import { hash, genSalt } from 'bcryptjs'

let usersCollection: Collection
export default class UsersModel {
	static injectDB(db: Db) {
		usersCollection = db.collection('users')
	}

	static async findUsers() {
		const cursor = await usersCollection.find({ private: false })
		const projection = await cursor.project({
			_id: 1,
			username: 1,
			joined: 1,
			fame: 1,
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
}
