import { readFile, readFileSync } from 'fs';
import * as xml2js from 'xml2js';
import Parser from 'rss-parser';
import { FeedItem, OpmlMain } from '../../models/allModels';

const parser: Parser = new Parser({});

export default async function getSingleRss() {

  const rssFilePath = './asset/feeds.opml';

  const fileContents = await readFileSync(rssFilePath, 'utf8');

  xml2js.parseStringPromise(fileContents).then((data: OpmlMain) => {

    let item = data.opml.body[0].outline[3].outline[0].$

    console.log(`${item.xmlUrl}`)


    new Promise(async (resolve, reject) => {
      let newFeedRes = await parser.parseURL(item.xmlUrl) as { items: FeedItem[] };
      newFeedRes.items.forEach((item)=>{
        console.log(`${item.pubDate}`)
      })
     
    })


  }).catch((err) => {
    console.error(err);
  });


}
