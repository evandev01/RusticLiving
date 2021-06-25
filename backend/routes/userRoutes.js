import express from 'express'
const router = express.Router()
import { authUser } from '../controllers/userController.js'

// Calls authUser function in userController
router.post('/login', authUser)

export default router
