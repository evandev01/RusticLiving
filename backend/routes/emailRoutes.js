import express from 'express'
import dotenv from 'dotenv'
import sgMail from '@sendgrid/mail'
const router = express.Router()
dotenv.config()

router.post('/', async (req, res) => {
  const senderEmail = req.body.email
  const subject = req.body.subject
  const text = req.body.text
  const content = `
  email: ${senderEmail}
  subject: ${subject} 
  text: ${text} `

  // using Twilio SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: `<rusticliving.nwi@gmail.com>`, // Change to your recipient
    from: `<rusticliving.nwi@gmail.com>`, // Change to your verified sender
    subject: subject,
    text: content,
    html: `
    <h3>Email: <strong>${senderEmail}</strong></h3>
    <h3>Subject: <strong>${subject}</strong></h3>
    <h3>Message:</h3>
    <h4><strong>${text}</strong></h4>`,
  }
  await sgMail.send(msg).then(
    () => {},
    error => {
      console.error(error)

      if (error.response) {
        console.error(error.response.body)
      }
    }
  )
})

export default router
