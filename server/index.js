import express from 'express';
import {config} from 'dotenv';
import connectDB from './mongoDB/connection.js';
import cors from 'cors';
import Router from './Routes/router.js';
import cookieParser from 'cookie-parser';


config({path: "./.env"});
const app = express();



connectDB();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api", Router);

app.listen(process.env.PORT, ()=>{
    console.log(`Server started at port ${process.env.PORT}`);
})