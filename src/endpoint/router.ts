import express from 'express';

export const app = express();
const port = parseInt(process.env.WEBSERVERPORT) || 5676

import { parseOpml } from '../parser/OpmlParser';
import { random } from 'lodash';
import { randomUUID } from 'crypto';

app.get('/parseOpmlToDb', async (req, res) => {
  
  parseOpml()
})

app.listen(port, "localhost", () => {
  console.log(`Example app listening on port ${port}`)
})




