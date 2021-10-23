// import sgMail from '@sendgrid/mail'
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import galleryRoutes from './routes/galleryRoutes.js'
import customRoutes from './routes/customRoutes/index.js'
import orderRoutes from './routes/orderRoutes.js'
import customPreOrderRoutes from './routes/customPreOrderRoutes.js'
import customOrderRoutes from './routes/customOrderRoutes.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import emailRoutes from './routes/emailRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// const msg = {
//   to: 'evanbero@evandev.com', // Change to your recipient
//   from: 'evanbero@evandev.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail.send(msg).then(
//   () => {},
//   error => {
//     console.error(error)

//     if (error.response) {
//       console.error(error.response.body)
//     }
//   }
// )

app.use('/api/products', productRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/custom', customRoutes)
app.use('/api/users', userRoutes)
app.use('/api/custompreorders', customPreOrderRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/customorders', customOrderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/contact-send', emailRoutes)

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
