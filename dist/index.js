"use strict";
/*
import app from "../../untitled/src/app";
import dotenv from "dotenv";
import DBConnection from "../../untitled/src/db/DBConnection";

dotenv.config();

const port = process.env.PORT || 3000;

DBConnection().then(result => console.log(result))

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express, {Express,Request,Response} from 'express';
// import express, {Express,Request,Response} from 'express';
// import app from "./app";
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
// import DBConnection from "./db/DBConnection";
dotenv_1.default.config(); //load the all properties from the .env file
// 01.initialize the express app
const app = (0, express_1.default)();
// 02.define application port(define in the .env file)
const port = process.env.PORT || 3000; // Access the port
// 03.define simple HTTP GET request handler
app.get("/", (req, res) => {
    res.send("Hello world!");
});
//then() is call back function
// DBConnection().then(result => console.log(result))
//04.Instruct the express app to listen on port 3000
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
