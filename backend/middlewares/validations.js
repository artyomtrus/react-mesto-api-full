const { celebrate, Joi } = require('celebrate');
const { REGEX } = require('../constants');

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(REGEX),
  }),
});
const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});

const validateRefreshUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validateRefreshAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().min(2).pattern(REGEX),
  }),
});

module.exports = {
  validateCreateCard,
  validateCardId,
  validateUserId,
  validateRefreshUser,
  validateRefreshAvatar,
};
