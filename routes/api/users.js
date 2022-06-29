const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  editUserSubscription,
  updateUserAvatar,
} = require('../../controllers/users');
const router = express.Router();
const { schemaRegister, schemaLogin } = require('../../models/user');
const { validateRequest, auth, upload } = require('../../middlewares');

router.post('/register', validateRequest(schemaRegister), registerUser);
router.post('/login', validateRequest(schemaLogin), loginUser);
router.post('/logout', auth, logoutUser);
router.post('/current', auth, currentUser);
router.patch('/', auth, editUserSubscription);
router.patch('/avatars', auth, upload.single('avatar'), updateUserAvatar);

module.exports = router;
