import express, {
	Application,
	Request,
	Response,
	NextFunction,
	CookieOptions,
} from 'express'
import cookieParser from 'cookie-parser'
import routes from './routes/index.route'
import { join } from 'path'
// import cors from 'cors'
// import { PORT } from './index'

const app: Application = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(cors(/**{ origin: `http://localhost:${PORT}` }**/))
app.use(cookieParser())
app.set('view engine', 'ejs')
app.set('views', join(__dirname, '../views'))
app.use('/', routes)

// Serve Client
app.use(express.static(join(__dirname, '../build')))
app.use('/*', (req: Request, res: Response, next: NextFunction) => {
	res.sendFile('index.html')
	// res.status(404).send('Page not found')
})

export default app
