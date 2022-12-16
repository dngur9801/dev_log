const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');

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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: location,
    credentials: true,
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
      domain: process.env.NODE_ENV === 'production' && process.env.API_ADDRESS,
    },
  })
);
app.use(passport.initialize()); //초기화
app.use(passport.session()); //세션에서 로그인정보 복구
app.use('/uploads', express.static('uploads'));

db.sequelize.sync().then(() => console.log('db connect'));

// routers
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/comment', commentRouter);

app.listen(port, () => {
  console.log(`server runing port:${port}`);
});
