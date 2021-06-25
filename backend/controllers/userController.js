import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Find the user // Find one document
  const user = await User.findOne({ email })

  // Checks to see if the user exists
  // Attempts to match the password to the encrypted password using bcrypt inside userModel
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null,
    })
  } else {
    // Unauthorized 401 status
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

export { authUser }
