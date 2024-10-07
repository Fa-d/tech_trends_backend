import { readFile } from 'fs';
import * as xml2js from 'xml2js';
import { OpmlRepository } from '../repositories/opml.dbRepo';


export function parseOpml(): Promise<any> {
  const filePath = './asset/feeds.opml';

  return new Promise((resolve, reject) => {
    readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return
      }
      try {
        xml2js.parseStringPromise(data).then((result) => {
          var values = []

          result.opml.body.forEach(element => {
            element.outline.forEach(sameCategoryArt => {
              sameCategoryArt.outline.forEach(indivArticle => {
                values.push(
                  [
                    sameCategoryArt.$.title,
                    indivArticle.$.title,
                    indivArticle.$.xmlUrl,
                    new Date()
                  ]
                )
              });
            })
          })

          new OpmlRepository().saveAllRssUrls(values);
          resolve("Insertion Completed")
        });

      } catch (error) {
        reject(error)
        console.error('Error:', error);
      }
    })
  })

}


