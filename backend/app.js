require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const { errors } = require('celebrate');

const cors = require('cors');

const rateLimit = require('express-rate-limit');

const helmet = require('helmet');

const router = require('./routes');

const handleErrors = require('./middlewares/handleErrors');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.use(helmet());

const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Слушаю порт 3000');
// eslint-disable-next-line eol-last
});