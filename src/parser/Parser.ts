import Parser from 'rss-parser';

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

const parser: Parser<FeedResponse> = new Parser({

});

export function parsingRss() {
  (async () => {

    const feed = await parser.parseURL('https://www.reddit.com/.rss');
    const items = feed.items
    const itemKeys: Array<any> = Object.keys(items[0])
    console.log(itemKeys);
    
  })();
}
