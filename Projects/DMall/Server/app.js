const express=require('express')
const compression=require('compression')
const app=express()
const https=require('https')
const fs=require('fs')
const options={
    cert:fs.readFileSync('./full_chain.pem'),
    key:fs.readFileSync('./private.key')
}

//启用GZIP
app.use(compression)

//托管静态资源
app.use(express.static('./dist'))

//启用https
//https.createServer(options,app).listen(443)

//http
app.listen(80,()=>{
    console.log('Server running at http://127.0.0.1');
})