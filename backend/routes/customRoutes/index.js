import path from 'path'
import express from 'express'
const router = express.Router()
import base from './baseRoutes.js'
import paint from './paintRoutes.js'
import stain from './stainRoutes.js'
import table from './tableRoutes.js'
import door from './doorRoutes.js'
import bedFrame from './bedFrameRoutes.js'
import accent from './accentRoutes.js'

// Route for Custom Products CRUD
router.use('/base', base)
router.use('/paint', paint)
router.use('/stain', stain)
router.use('/table', table)
router.use('/door', door)
router.use('/bedframe', bedFrame)
router.use('/accent', accent)

export default router
