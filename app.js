const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('express-rate-limit');
const hpp = require('hpp');
const userRouter = require('./routes/user.routes');
const repairsRouter = require('./routes/repairs.routes');
const errorController = require('./controllers/error.controller');
const sanitizer = require('perfect-express-sanitizer');
const logger = require('./util/logger');

const app = express();
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again later.👌',
});

//todo lo que tenga use es un middleware

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(
  sanitizer.clean({
    xss: true,
    noSql: true,
    sql: false,
  })
);

app.use('api/v1', limiter);
//rutas
app.use('/api/v1/users', userRouter);
app.use('/api/v1/repairs', repairsRouter);

app.use(errorController);

// Manejo de errores no controlados
// app.use((err, req, res, next) => {
//   console.log(err);
//   logger.error(err.stack);
//   res.status(500).json({ error: 'Something went wrong!' });
// });

module.exports = app;
