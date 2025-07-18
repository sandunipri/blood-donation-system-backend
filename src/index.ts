import app from "./app";
import dotenv from "dotenv";
import DBConnection from "./db/DBConnection";

dotenv.config();

const port = process.env.PORT || 3000;

DBConnection().then(result => console.log(result))

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})



/*
// import express, {Express,Request,Response} from 'express';

// import express, {Express,Request,Response} from 'express';

// import app from "./app";
import dotenv from "dotenv";
import express, {Express,Request,Response} from 'express';

// import DBConnection from "./db/DBConnection";

dotenv.config(); //load the all properties from the .env file

// 01.initialize the express app
const app :Express = express();

// 02.define application port(define in the .env file)
const port = process.env.PORT || 3000; // Access the port

// 03.define simple HTTP GET request handler
app.get("/",(req : Request , res : Response) =>{
    res.send("Hello world!");
});

//then() is call back function
// DBConnection().then(result => console.log(result))


//04.Instruct the express app to listen on port 3000
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})
*/
