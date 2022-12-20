const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const hpp = require('hpp');
const sameSiteCookieMiddleware = require('express-samesite-default');

const db = require('./models');
const passportConfig = require('./passport');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const commentRouter = require('./routes/comment');

dotenv.config();
passportConfig();
const app = express();
const port = 5000;
const location =
  process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_ADDRESS
    : 'http://localhost:3000';

// TODO:보안관련 모듈 hpp,helmet 필요시 추가
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet({ contentSecurityPolicy: false }));
} else {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(sameSiteCookieMiddleware.sameSiteCookieMiddleware());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  cors({
    origin: location,
    credentials: true,
  })
);
app.use(
  session({
    key: 'session_cookie_user_auth',
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      SameSite: 'none',
      domain:
        process.env.NODE_ENV === 'production' && process.env.CLIENT_ADDRESS,
    },
  })
);
app.use(passport.initialize()); //초기화
app.use(passport.session()); //세션에서 로그인정보 복구
app.use('/uploads', express.static('uploads'));

db.sequelize.sync().then(() => console.log('db connect'));

app.get('/', (req, res) => {
  res.send('express server');
});

// routers
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/comment', commentRouter);

app.listen(port, () => {
  console.log(`server runing port:${port}`);
});
