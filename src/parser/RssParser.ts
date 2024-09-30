import Parser from 'rss-parser';
import { OpmlRepository, OpmlXmlRes } from '../repositories/opml.repository';
import { forEach } from 'lodash';

type FeedItem = {
  title: string,
  link: string,
  pubDate: string,
  author: string,
  content: string,
  contentSnippet: string,
  id: string,
  isoDate: string
};
type FeedResponse = {
  items: FeedItem[],
  link: string,
  feedUrl: string,
  title: string,
  lastBuildDate: string
};

const parser: Parser<FeedResponse> = new Parser({});

export function parsingRss() {
  (async () => {
    let response: OpmlXmlRes[] = await new OpmlRepository().getAllRssUrls()
    response.forEach(async item => {
      const feed = await parser.parseURL(item.rss_url);
      const items = feed.items
      const itemKeys: Array<any> = Object.keys(items[0])
      console.log(itemKeys);
    });


  })();
}
