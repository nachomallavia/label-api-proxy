const express = require('express');

const app = express();
const port = 8080;
const http =require('http');
const https = require('https');

const bodyParser = require('body-parser')
const fetch = require('node-fetch');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested, Content-Type, Accept Authorization"
    )
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "POST, PUT, PATCH, GET, DELETE"
      )
      return res.status(200)
      
    }
    next()
  })

async function handleLabelRequest(req,res){
    console.log('Trying to fetch label')
    try{
        let fullLabel = JSON.stringify(req.body)


        // console.log(`fullLabel is ${fullLabel}`)
        // console.dir(req.body)
        const response = await fetch('http://api.labelary.com/v1/printers/8dpmm/labels/4x6/0/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: fullLabel
        });
        const blob = await response.blob();
        let buffer = await blob.arrayBuffer();

        console.dir(blob)

        // console.log(buffer)
        // console.log(blob);

        res.type(blob.type);
        res.send(buffer)
        


     

    }
    catch(error){
        console.log(error)
    }
}

app.get('/', (req, res) => {
    res.send('Hello World from RENDER!')
  })
app.get('/check', (req,res)=>{
    res.send('Hola Hola')
})
app.post('/label',bodyParser.urlencoded(),handleLabelRequest);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })