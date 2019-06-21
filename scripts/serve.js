const express = require('express');
const axios = require('axios');
const path = require('path');
const history = require('connect-history-api-fallback');

const app = express();
app.use(express.json());
const port = 3000;

app.post('/api/token', (req, res) => {
  const { xh, pwd } = req.body;
  getToken(xh, pwd)
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(e => res.send(e));
});

app.post('/api/grade', (req, res) => {
  const { xh } = req.body;
  const { token } = req.headers;
  getGrade(xh, token)
    .then(response => res.status(200).json(response.data))
    .catch(e => res.send(e));
});


app.use(history());
app.use(express.static(path.join(__dirname, 'build')));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


function getGrade(xh, token) {
  const options = {
    methods: 'GET',
    url: 'http://jwctest.its.csu.edu.cn/app.do',
    params: {
      method: 'getCjcx',
      xh
    },
    headers: {
      token
    }
  };

  return axios(options);
}

function getToken(xh, pwd) {
  const options = {
    methods: 'GET',
    url: 'http://jwctest.its.csu.edu.cn/app.do',
    params: {
      method: 'authUser',
      xh,
      pwd
    }
  };

  return axios(options);
}