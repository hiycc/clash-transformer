const express = require('express');
const axios = require('axios');
const yaml = require('js-yaml');
const fs = require('fs');

const app = express();

app.get('/', function (req, res) {
  const rules = fs.readFileSync('./resource/rules.yaml',{
    encoding: 'utf-8',
    flag: 'r'
  });
  axios.get('https://g.luxury/link/mX0aZlRYJgimotSg?clash=2')
    .then(function (response) {
      const doc = yaml.load(response.data);
      doc.rules = rules;
      res.send(doc);
    })

})

app.listen(3000);