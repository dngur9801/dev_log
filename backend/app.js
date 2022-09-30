const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./models');
const { User } = require('./models');

const app = express();
const port = 5000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

db.sequelize.sync();

app.post('/user/signup', async (req, res, next) => {
  try {
    const { email, password, re_password } = req.body;
    const emailCheck =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (!emailCheck.test(email)) {
      return res.status(401).json('이메일 형식이 맞지 않습니다.');
    }

    if (password !== re_password) {
      return res.status(401).json('동일한 패스워드를 입력해주세요.');
    }

    const exUser = await User.findOne({
      where: {
        email,
      },
    });

    if (exUser) {
      return res.status(403).send('이미 사용 중인 아이디입니다.');
    }

    await User.create({
      email,
      password,
    });
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.listen(port, () => {
  console.log(`server runing port:${port}`);
});
