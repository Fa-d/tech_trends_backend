import Parser from 'rss-parser';
import { OpmlRepository } from '../repositories/opml.repository';
import { FeedResponse, OpmlXmlRes } from '../model/allModels';

const parser: Parser<FeedResponse> = new Parser({});

export async function parsingRss() {

  const opmlRepo = new OpmlRepository()

  let response: OpmlXmlRes[] = await opmlRepo.getAllRssUrls()
  var allFeed: FeedResponse[]
  var feed: FeedResponse

  feed = await parser.parseURL(response[1].rss_url);
    const fzdlgbngf:FeedResponse = {
      link: feed.link,
      feedUrl: feed.feedUrl,
      title: feed.title,
      lastBuildDate: feed.lastBuildDate,
      items: []
    }
  allFeed.push(fzdlgbngf)
  console.log(allFeed)
  //console.log(response)
  // response.forEach(async item => {
  //   try {
  //     feed = await parser.parseURL(item.rss_url);
  // //    allFeed[feed]
  //   } catch (err) {}
  // });
  console.log("sdgf", allFeed)
  //opmlRepo.insertAllFeeds(allFeed)

}
