const router = require('express').Router();
const {
  getUsers,
  getUserById,
  getUserByMe,
  refreshUser,
  refreshAvatar,
} = require('../controllers/users');
const { validateUserId, validateRefreshUser, validateRefreshAvatar } = require('../middlewares/validations');

router.get('/', getUsers);
router.get('/me', getUserByMe);
router.get('/:userId', validateUserId, getUserById);
router.patch('/me', validateRefreshUser, refreshUser);
router.patch('/me/avatar', validateRefreshAvatar, refreshAvatar);

module.exports = router;
