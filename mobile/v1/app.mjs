import express from 'express'
import { dynamicRes } from "../../main/queryTable.js"
import 'dotenv/config';

const app = express()
const port = process.env.WEB_SERVER_PORT


app.get('/tableQuery', async (req, res) => {
  var theRes = await dynamicRes
  console.log(new Date())
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

