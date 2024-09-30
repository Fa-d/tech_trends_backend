import * as fs from 'fs';
import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";
import { readFile } from 'fs';
import * as xml2js from 'xml2js';
import { OpmlRepository } from '..//repositories/opml.repository';

interface OpmlOutline {
  text: string;
  type?: string;
  xmlUrl?: string;
  htmlUrl?: string;
  children?: OpmlOutline[];
}

interface OpmlDocument {
  title: string;
  outlines: OpmlOutline[];
}

export function parseOpml() {
  const filePath = './asset/feeds.opml';

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return
    }
    try {
      xml2js.parseStringPromise(data).then((result) => {
        var values = []
        const topicTitle = []
        const articleTitle = []
        const rssUrl = []
        const dates = []

        result.opml.body.forEach(element => {
          element.outline.forEach(sameCategoryArt => {
            sameCategoryArt.outline.forEach(indivArticle => {
              topicTitle.push(sameCategoryArt.$.title)
              articleTitle.push(indivArticle.$.title)
              rssUrl.push(indivArticle.$.xmlUrl)
              dates.push(new Date())
            });
          })
        })

        values = topicTitle.map((topic, index) => [
          topic,
          articleTitle[index],
          rssUrl[index],
          dates[index]
        ])

        new OpmlRepository().saveAllRssUrls(values);
      });

    } catch (error) {
      console.error('Error:', error);
    }
  })

}


