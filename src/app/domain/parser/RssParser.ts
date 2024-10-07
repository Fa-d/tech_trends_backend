import Parser from 'rss-parser';
import { FeedResponse, OpmlXmlRes } from '../../models/allModels';
import OpmlService from '../../services/opml.service';


const parser: Parser<FeedResponse> = new Parser({});

export async function parsingRss(): Promise<string[][]> {
  const opmlService = new OpmlService()

  let response: OpmlXmlRes[] = await opmlService.getAllRssUrls()
  var allFeed: any = []
  var feed: FeedResponse
  return new Promise(async (resolve, reject) => {
    for (const item of response) {
   
        try {
          feed = await parser.parseURL(item.rss_url);
          let date = new Date(feed.lastBuildDate);
          let mysqlDateStr = date.toISOString().slice(0, 19).replace('T', ' ');
  
          const tempArray = [
            feed.title,
            feed.link,
            feed.feedUrl,
            mysqlDateStr,
            item.topic_title
          ]
          allFeed.push(tempArray)
          console.log("fetched: ", feed.link)
        } catch (err) {
          
        }
    }
    opmlService.insertAllFeeds(allFeed)
    resolve(allFeed);
  })

}


