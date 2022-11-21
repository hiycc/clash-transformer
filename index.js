const express = require('express');
const axios = require('axios');
const yaml = require('js-yaml');
const fs = require('fs');

const app = express();

app.get('/', function (req, res) {
  var rules = fs.readFileSync('./resource/rules.yaml',{
    encoding: 'utf-8',
    flag: 'r'
  });
  const origin = fs.readFileSync('./resource/source.yaml',{
    encoding: 'utf-8',
    flag: 'r'
  })
  var origin_yaml = yaml.load(origin);
  origin_yaml.rules = rules;
  // const data = yaml.dump(origin);
  // res.send(origin_yaml);
  // console.log(data);
  // const ws = fs.createWriteStream('./resource/clash.yaml');
  // ws.write(data, 'utf-8');
  // ws.end();
  fs.writeFileSync('./resource/clash.yaml',yaml.dump(origin_yaml))

  // ws.on('finish', function() {
  //   res.status(200);
  //   res.download('./resource/clash.yaml')
  // });

  // ws.on('error', function(err){
  // });
  res.download('./resource/clash.yaml')

})

app.get('/update', async function (req, res) {

  const result = await axios.get('https://g.luxury/link/mX0aZlRYJgimotSg?clash=2');
  // console.log(result.data)
  // const origin = yaml.load(doc);
  // rules = yaml.load(rules);
  // doc.rules = rules;
  // console.log(doc);
  // doc.rules = rules;
  // axios.get('https://g.luxury/link/mX0aZlRYJgimotSg?clash=2',)
  // .then(function (response) {
  //   const doc = yaml.load(response.data);
  //   doc.rules = rules;
  //   // res.setHeader('Content-Type', 'application/octet-stream'); 
  //   // res.send(doc);
  //   console.log('123');
  //   console.log(doc);
  const ws = fs.createWriteStream('./resource/source.yaml');
  ws.write(result.data, 'utf-8');
  ws.end();


  ws.on('finish', function() {
    res.status(200);
    res.send('source.yaml更新完成');
  });

  ws.on('error', function(err){
    res.send('source.yaml更新失败');
  });
    

    
  // })
  // .catch((error)=> {
  //   console.log(error)
  // })
})

app.listen(3000);