import https from "https";
import express from 'express';
const app = express();

import axios from 'axios';
import { MongoClient } from "mongodb";

let mongoClient;
try {
    mongoClient = new MongoClient("mongodb://127.0.0.1/27017");
} catch (error) {
    console.log(error.message);
}

const options = {
    key: fs.readFileSync("./key.pem"),
    cert: fs.readFileSync("./cert.pem"),
};

import fs from 'fs';
import URL from 'url';
import path from 'path';
const __filename = URL.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { v4 as uuidv4 } from 'uuid';
import translate from 'google-translate-api-x';
import Nightmare from 'nightmare';

import cors from 'cors';
import formidable from 'express-formidable';

import { PORT } from './port.js';
import { MyPaths } from './MyPaths.js';

app.use(cors())
app.use(formidable())
app.use(express.static(__dirname + "/public"));

let settings = { express, app, axios, mongoClient, fs, path, uuidv4, MyPaths, translate, Nightmare, URL }


import { MyAPIs } from './MyAPIs.js';

MyAPIs(settings);

// var server = https.createServer(options, app).listen(PORT, function () {
//     console.log("Express server listening on port " + PORT);
// });

app.listen(PORT, () => {
    console.log(`Server start on ${PORT} port!`);
})
