import './src/dotEnv.js'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'

import { errorHandler } from './src/utils/errorHandler.js' // Fixed path typo
import { connectDB } from './src/lib/db.js'
import taskRoute from './src/routes/task.route.js'

const app = express()
const PORT = process.env.PORT || 5001

// 1. GLOBAL MIDDLEWARE (Must be placed before any routes)
app.use(helmet())
app.use(morgan('dev'))
app.use(
  cors({
origin: 'http://localhost:5173', // Double check your Vite default port (5173 vs 5174)
    credentials: true, // Fixed lowercase 'credentials'
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 2. ROUTES
app.get('/', (req, res) => {
  res.send('API Server is running smoothly')
})

app.use('/api/task', taskRoute)

// 3. ERROR HANDLER (Must be placed after all routes)
app.use(errorHandler)

// 4. SERVER INITIALIZATION
const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`🌍 Server Running On PORT ${PORT}`)
    })
  } catch (error) {
    console.error('❌ Database connection failed:', error.message)
    process.exit(1) // Exit process with failure
  }
}

startServer()
