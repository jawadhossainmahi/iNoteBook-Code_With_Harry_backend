const connectTOMongose = require('./db');
connectTOMongose()
const express = require('express');

const app = express();
const port = 5000;

// this is use to send json in response 
app.use(express.json())

// Available Routes
app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))
app.get('/',(req, res)=>{
    res.send("hello Mahi");
})
app.get('/hel',(req, res)=>{
    res.send("hello hel");
})

app.listen(port,()=>{
    console.log(`EXample app listening at http://localhost:${port}`)
})