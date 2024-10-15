import { hostname } from 'os';
import app from './infrastructure/server';
const filePath = './asset/feeds.opml';  // Path to your OPML file

export const main = () => {
  const port = parseInt(process.env.WEBSERVERPORT) || 3000
  app.listen(port, "0.0.0.0", () => {
    console.log(`Example app listening on host ${hostname} port ${port}`)
  })

  app.get("/", async (req, res) => {
    res.send("Hello Worls")
  })
};

main()

