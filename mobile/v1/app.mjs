import express from 'express';
import { getCategories, getChildArticles, getMotherArticles } from "../../main/queryTable.js";
import 'dotenv/config';
import jwt from 'jsonwebtoken';

const app = express();
const port = process.env.WEB_SERVER_PORT;
const secretKey = process.env.JWT_SECRET_KEY;



app.get('/getAllCategories', async (req, res) => {
  var theRes = await getCategories()
  console.log(theRes)
  res.send(theRes)
})

app.get('/getAllMotherArticles', async (req, res) => {
  var theRes = await getMotherArticles()
  console.log(theRes)
  res.send(theRes)
})

app.get('/getAllChildArticles', async (req, res) => {
  var theRes = await getChildArticles()
  console.log(theRes)
  res.send(theRes)
})


app.get('/getTitles', (req, res) => {
  res.send('Hello World!')
})

app.get("/parseDataFromNotion", (req, res) => {
  queryXmlParser
})

app.listen(port, "localhost", () => {
  console.log(`Example app listening on port ${port}`)
})

