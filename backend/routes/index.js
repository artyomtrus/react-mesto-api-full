const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('../controllers/users');
const { REGEX } = require('../constants');
const auth = require('../middlewares/auth');
const routerUsers = require('./users');
const routerCards = require('./cards');
const NotFoundError = require('../errors/not-found-error');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2).pattern(REGEX),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

router.use('/users', auth, routerUsers);
router.use('/cards', auth, routerCards);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не существует'));
});

module.exports = router;
