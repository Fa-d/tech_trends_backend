import { parseOpml } from '../domain/parser/OpmlParser';
import { parsingRss } from '../domain/parser/RssParser';
import { authenticateToken, generateAccessToken } from '../middlewares/tokenRes';
import FeedService from '../services/feed.service';
import OpmlService from '../services/opml.service';


const opmlService = new OpmlService()
const feedService = new FeedService()

function userRoutes(app) {

  app.post('/loginToUser', (req, res) => {
    const token = generateAccessToken({ username: req.body.username });
    res.send(token);
  });

  app.get('/parseOpmlToDb', async (req, res) => {
    let response = await parseOpml(opmlService)
    res.status(200).send(response);
  })

  app.get('/getAllParsedXmlUrls', authenticateToken, async (req, res) => {
    let response = await opmlService.getAllRssUrls()
    res.status(200).send(response);
  })

  app.get('/parseRss', async (req, res) => {
    let response = await parsingRss()
    res.status(200).send(response)
  })

  app.get('/getAllFeeds', authenticateToken, async (req, res) => {
    let response = await feedService.getAllFeeds()
    res.status(200).send(response)
  })

  app.get('/getFeedCategory', authenticateToken, async (req, res) => {
    let response = await feedService.getAllFeedsByCategory()
    res.status(200).send(response)
  })

  app.get('/getFeedsByCategory', authenticateToken, async (req, res) => {
    let response = await feedService.getFeedsByCategory(req.query.category)
    res.status(200).send(response)
  })
}


export default userRoutes;
