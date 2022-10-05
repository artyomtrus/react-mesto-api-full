const router = require('express').Router();

const {
  getCards,
  deleteCard,
  createCard,
  putLike,
  deleteLike,
} = require('../controllers/cards');
const { validateCreateCard, validateCardId } = require('../middlewares/validations');

router.get('/', getCards);
router.post('/', validateCreateCard, createCard);
router.delete('/:cardId', validateCardId, deleteCard);
router.put('/:cardId/likes', validateCardId, putLike);
router.delete('/:cardId/likes', validateCardId, deleteLike);

module.exports = router;
