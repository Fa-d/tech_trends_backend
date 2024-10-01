import Parser from 'rss-parser';
import { OpmlRepository } from '../repositories/opml.repository';
import { FeedResponse, OpmlXmlRes } from '../model/allModels';


const parser: Parser<FeedResponse> = new Parser({});

export async function parsingRss(): Promise<string[]> {
  const opmlRepo = new OpmlRepository()

  let response: OpmlXmlRes[] = await opmlRepo.getAllRssUrls()
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
            mysqlDateStr
          ]
          allFeed.push(tempArray)
        } catch (err) {
          
        }
    }
    opmlRepo.insertAllFeeds(allFeed)
    resolve(allFeed);
  })

}


