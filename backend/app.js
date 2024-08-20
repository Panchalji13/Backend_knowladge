import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import UserRoute from './routers/UserRout.js'
import { body, validationResult } from 'express-validator';


const app = express();

var corOption ={
    origin : 'http://localhost:3000'
}

app.use(cors(corOption));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user",UserRoute);


app.get('/',(req, res)=>{
res.send("heloo world......!");
});
const port=8080; 
app.listen(port,()=>{
    console.log("server start...");
});
