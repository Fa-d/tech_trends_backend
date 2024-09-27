import * as fs from 'fs';
import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";
import { readFile } from 'fs';
import * as xml2js from 'xml2js';

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

        result.opml.body.forEach(element => {
          element.outline.forEach(sameCategoryArt => {
            sameCategoryArt.outline.forEach(indivArticle => {
              let tempItem = {
                topicTitle: sameCategoryArt.$.title,
                articleTitle: indivArticle.$.title,
                xmlUrl: indivArticle.$.xmlUrl
              }
            });
          })
        })

      });

    } catch (error) {
      console.error('Error:', error);
    }
  })

}


