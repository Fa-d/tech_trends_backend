import express from 'express'
import { dynamicRes } from "../../main/queryTable2.mjs"
import { putDataToTable } from "../../main/inputItemTable.mjs"
import { queryXmlParser } from "../../main/xmlParserCsv.js"
import 'dotenv/config';

const app = express()
const port = process.env.WEB_SERVER_PORT


app.get('/tableQuery', async (req, res) => {
  var theRes = await dynamicRes
  console.log(new Date())
  res.send(theRes)
})

app.get('/putDataToqTable', async (req, res) => {
  var theRes = await putDataToTable
  console.log(theRes)
  res.send(new Date())
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

