import app from './infrastructure/server';
const filePath = './asset/feeds.opml';  // Path to your OPML file

export const main = () => {
  const port = parseInt(process.env.WEBSERVERPORT) || 5676
  app.listen(port, "localhost", () => {
    console.log(`Example app listening on port ${port}`)
  })
};

main()

