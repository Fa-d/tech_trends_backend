import express from 'express';

export const app = express();
const port = parseInt(process.env.WEBSERVERPORT) || 5676

import { parseOpml } from '../parser/OpmlParser';
import { OpmlRepository } from '../repositories/opml.repository';
import { parsingRss } from '../parser/RssParser';

app.get('/parseOpmlToDb', async (req, res) => {

  parseOpml()
})

app.get('/getAllParsedXmlUrls', async (req, res) => {
  let response = await new OpmlRepository().getAllRssUrls()
  res.send(response);
})


app.listen(port, "localhost", () => {
  console.log(`Example app listening on port ${port}`)
})

