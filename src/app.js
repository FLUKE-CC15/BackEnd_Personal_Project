require('dotenv').config();
const express = require('express');
const cors = require('cors');
const notFoundMid = require('./middlewares/not-found');
const errMid = require('./middlewares/error');
const rateLimitMid = require('./middlewares/rate-limit');
const morgan = require('morgan')

const authRoute = require('./Router/auth-route')

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(morgan('dev'))
app.use(rateLimitMid);
app.use(express.json());

app.use('/auth', authRoute)

app.use(notFoundMid);
app.use(errMid)

const PORT = process.env.PORT || '5000';
app.listen(PORT, () => console.log(`server running on PORT: ${PORT}`))