import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import customProductRoutes from './routes/customProductRoutes.js'
import customAccentRoutes from './routes/customAccentRoutes.js'
import customBaseRoutes from './routes/customBaseRoutes.js'
import customPaintRoutes from './routes/customPaintRoutes.js'
import customSpeciesRoutes from './routes/customSpeciesRoutes.js'
import customStainRoutes from './routes/customStainRoutes.js'
import customPriceRoutes from './routes/customPriceRoutes.js'

import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import customOrderRoutes from './routes/customOrderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/products', productRoutes)
app.use('/api/customproducts', customProductRoutes)
app.use('/api/customaccents', customAccentRoutes)
app.use('/api/custombases', customBaseRoutes)
app.use('/api/custompaints', customPaintRoutes)
app.use('/api/customspecies', customSpeciesRoutes)
app.use('/api/customstains', customStainRoutes)
app.use('/api/customprices', customPriceRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/customorders', customOrderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

// __dirname not available with esmodules // path.resolve() mimics common js
// Makes uploads (uploads/file.txt in root folder) accessible from the browser
// __dirname gives access to all segments of the file

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running...........')
  })
}

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
