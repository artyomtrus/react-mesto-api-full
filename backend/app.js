require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/error-handler');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
});

const allowedCors = [
  'https://artyom.trus.nomoredomains.icu',
  'http://artyom.trus.nomoredomains.icu',
];

const app = express();

console.log(process.env.NODE_ENV);

app.use(bodyParser.json());

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
});

app.use(limiter);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Сервер запущен');
});
