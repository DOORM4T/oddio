import express, { Application } from 'express'
import routes from './routes/index.route'
import { resolve } from 'path'

const app: Application = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', resolve(__dirname, '../views'))
app.use('/', routes)

export default app
