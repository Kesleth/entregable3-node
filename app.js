const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.routes');
const repairsRouter = require('./routes/repairs.routes');
const handleJWTError = require('./controllers/error.controller');
const globalErrorHandler = require('./controllers/error.controller');
const handleCastError23505 = require('./controllers/error.controller');
const handleJWTExpiredError = require('./controllers/error.controller');
const app = express();

//todo lo que tenga use es un middleware
app.use(express.json());
app.use(cors());
app.use(handleJWTError);
app.use(globalErrorHandler);
app.use(handleCastError23505);
app.use(handleJWTExpiredError);

//rutas
app.use('/api/v1/users', userRouter);
app.use('/api/v1/repairs', repairsRouter);

module.exports = app;
