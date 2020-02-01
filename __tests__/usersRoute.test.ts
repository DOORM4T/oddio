import supertest, { SuperTest } from 'supertest'
import app from '../src/app'

const request: SuperTest<any> = supertest(app)

describe('Users API', () => {
	describe('User Authentication', () => {
		it('registers new account successfully', (done) => {
			request
				.post('/auth/register')
				.send({ email: 'firstman@example.com', password: 'C00lc4t123$%^' })
				.expect(200, done)
		})

		it('error on invalid user registration', (done) => {
			request
				.post('/auth/register')
				.send({ email: 'bad email', password: 'abc123' })
				.expect(400, done)
		})

		it('pre-existing user logs in successfully', (done) => {
			request
				.post('/auth/login')
				.send({ email: 'firstman@example.com', password: 'C00lc4t123$%^' })
				.expect(200, done)
		})

		it('gives session token on login', (done) => {
			request
				.post('/auth/login')
				.send({ email: 'firstman@example.com', password: 'C00lc4t123$%^' })
				.expect(200, done)
		})

		it('error on invalid login', (done) => {
			request
				.post('/auth/login')
				.send({ email: 'firstman@example.com', password: 'badpassword' })
				.expect(400, done)
		})

		it('logs out successfully', (done) => {
			request
				.post('/auth/logout')
				.expect(200, done)
		})

		it('error on logout attempt when not logged in', (done) => {
			request
				.post('/auth/logout')
				.expect(400, done)
		})

		it('can delete pre-existing users', (done) => {
			request
				.post('/auth/deleteaccount')
				.send({ password: 'C00lc4t123$%^' })
		})

		it('fails to delete non-existant users', (done) => {
			request
				.post('/auth/deleteaccount')
				.send({ password: 'C00lc4t123$%^' })
		})
	})

	// describe('User Info', () => {
	// 	it('gets list of users', (done) => {})
	// 	it('gets user by ID', (done) => {})
	// })

	// describe('User Activity', () => {
	// 	it('successfully follow other users', (done) => {})
	// 	it('gets user by ID', (done) => {})
	// })

	// describe('Account Management', () => {
	// 	it('deletes user account successfully', (done) => {})
	// })
})
