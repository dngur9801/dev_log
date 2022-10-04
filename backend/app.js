const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');

const db = require('./models');
const passportConfig = require('./passport');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');

dotenv.config();
passportConfig();
const app = express();
const port = 5000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize()); //초기화
app.use(passport.session()); //세션에서 로그인정보 복구

db.sequelize.sync().then(() => console.log('db connect'));

app.use('/user', userRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`server runing port:${port}`);
});
