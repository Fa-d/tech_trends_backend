import { parseOpml } from '../domain/parser/OpmlParser';
import { parsingRss } from '../domain/parser/RssParser';
import OpmlService from '../services/opml.service';


const opmlService = new OpmlService()

function userRoutes(app) {
  app.get('/parseOpmlToDb', async (req, res) => {
    let response = parseOpml(opmlService)
    res.status(200).send(response);
  })

  app.get('/getAllParsedXmlUrls', async (req, res) => {
    let response = opmlService.getAllRssUrls()
    res.status(200).send(response);
  })


  app.get('/parseRss', async (req, res) => {
    let response = parsingRss()
    res.status(200).send(response)
  })

  app.get('/getAllFeeds', async (req, res) => {
    let response = opmlService.getAllFeeds()
    res.status(200).send(response)
  })

}


export default userRoutes;
