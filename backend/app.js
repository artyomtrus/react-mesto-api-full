const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/error-handler');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const allowedCors = [
  'https://artyom.trus.nomoredomains.icu/',
  'http://artyom.trus.nomoredomains.icu/',
  'localhost:3000',
];

const app = express();

app.use(bodyParser.json());

app.use(cors());
app.use(helmet());
app.use(limiter);

app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Сервер запущен');
});
