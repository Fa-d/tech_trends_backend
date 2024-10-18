import { parseOpml } from '../domain/parser/OpmlParser';
import { parsingRss } from '../domain/parser/RssParser';
import { authenticateToken, generateAccessToken } from '../middlewares/tokenRes';
import { CategoryListService } from '../services/categorylist.service';
import FeedService from '../services/feed.service';
import { FeedChildListService } from '../services/feedchildlist.service';
import OpmlService from '../services/opml.service';


const opmlService = new OpmlService()
const feedService = new FeedService()
const feedListService = new FeedChildListService()
const categoryListService = new CategoryListService()

function userRoutes(app) {

  app.post('/loginToUser', (req, res) => {
    const token = generateAccessToken({ username: req.body.username });
    res.send(token);
  });

  app.get('/parseOpmlToDb', async (req, res) => {
    let response = await parseOpml(opmlService)
    res.status(200).send(response);
  })

  app.get('/getAllParsedXmlUrls',  async (req, res) => {
    let response = await opmlService.getAllRssUrls()
    res.status(200).send(response);
  })

  app.get('/parseRss', async (req, res) => {
    let response = await parsingRss()
    res.status(200).send(response)
  })

  app.get('/getAllFeeds', async (req, res) => {
    let response = await feedService.getAllFeeds()
    res.status(200).send(response)
  })

  app.get('/getCategories', async (req, res) => {
    let response = await categoryListService.getAllCategory()
    res.status(200).send(response)
  })

  app.get('/getFeedsByCategory', async (req, res) => {
    let response = await feedService.getFeedsByCategory(req.query.category)
    res.status(200).send(response)
  })

  app.get('/getAllFeedChild', async (req, res) => {
    let response = await feedListService.getAllFeedListItems()
    res.status(200).send(response)
  })

  app.get('/getAllFeedChildByCategory', async (req, res) => {
    let response = await feedListService.getAllFeedListItemByCategory(req.query.category)
    res.status(200).send(response)
  })

}


export default userRoutes;
