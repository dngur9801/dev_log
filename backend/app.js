const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const db = require('./models');
db.sequelize.sync();

app.post('/user', (req, res) => {
  const { email, password, re_password } = req.body;
  console.log(req.body);
  res.status(201);
});

app.listen(port, () => {
  console.log(`server runing port:${port}`);
});
