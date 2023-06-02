const express = require('express');
const app = express();
const port = 8080;
const http =require('http');
const https = require('https');

app.get('/', (req, res) => {
    res.send('Hello World from RENDER!')
  })
app.get('/check', ()=>{
    res.send('Hola Hola')
})
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })