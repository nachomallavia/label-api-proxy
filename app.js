const express = require('express');
const app = express();
const port = 8080;
const http =require('http');
const https = require('https');

const fetch = require('node-fetch');

async function handleLabelRequest(req,res){
    let fullLabel = req.body;
    const response = await fetch('http://api.labelary.com/v1/printers/8dpmm/labels/4x6/0/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: fullLabel
    });
    res.send(response);
}

app.get('/', (req, res) => {
    res.send('Hello World from RENDER!')
  })
app.get('/check', (req,res)=>{
    res.send('Hola Hola')
})
app.post('/label',handleLabelRequest);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })