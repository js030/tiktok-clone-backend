import express from 'express';
import mongoose from 'mongoose';
import Data from './data.js';
import Videos from './dbModel.js';

const app = express();
const port = process.env.PORT || 9000;


const connection_url = 'mongodb+srv://kh:1234@cluster0.viqbh.mongodb.net/tiktok?retryWrites=true&w=majority';


mongoose.connect(connection_url, {
    tls : true
});

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'),
    res.setHeader('Access-Control-Allow-Headers', '*'),
    next()
})

app.post("/v2/posts" , (req, res) => {

    const dbVideos = req.body

    Videos.create(dbVideos, (err, data) => {
        if(err){
            res.status(500).send(err)
        }else {
            res.status(201).send(data)
        }
    })
});

app.get("/v2/posts" , (req, res) => {
    Videos.find((err, data) => {

        if(err){
            res.status(500).send(err)
        }else {
            res.status(200).send(data)
        }
    })
})


app.get("/", (req, res) =>  res.status(200).send("hello world"));

app.get("/v1/post", (req, res) => res.status(200).send(Data));

app.listen(port, () => console.log("listening on localhost"));


