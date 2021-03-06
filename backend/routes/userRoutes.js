import express from 'express'
import { authUser, getUserProfile, registerUser } from '../controllers/userController.js'
import { protect } from '../auth/authMiddleware.js'

const router = express.Router()

router.post('/', registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)

export default router