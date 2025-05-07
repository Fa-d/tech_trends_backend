import { read, readFile, appendFile } from 'fs';
import * as xml2js from 'xml2js';
import { FeedResponse, OpmlXmlRes, FeedCategoryResponse } from '../../models/allModels';
import Parser from 'rss-parser';
import connection from "../../../infrastructure/db/index";
import { QueryError } from 'mysql2';

const parser: Parser<FeedResponse> = new Parser({});

export function insertIntoRssList() {
  const filePath = './asset/feeds.opml';
  readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return
    }
    try {
      xml2js.parseStringPromise(data).then((result) => {
        result.opml.body.forEach(element => {
          element.outline.forEach(sameCategoryArt => {
            sameCategoryArt.outline.forEach(async indivArticle => {
              await parser.parseURL(indivArticle.$.xmlUrl).then((newFeedRes) => {
                newFeedRes['items'].forEach(item => {
                  const outputFilePath = './output.txt';
                  const categories = item['categories'];
                  if (categories != null) {
                    try {
                      let categoryList: string[] = [];
                      if (Array.isArray(categories)) {
                        categoryList = categories;
                      } else if (typeof categories === 'string') {
                        categoryList = categories.split(',');
                      }
                      const formattedCategories = categoryList.join('\n')
                      appendFile(outputFilePath, `${formattedCategories}\n`, (err) => {
                        if (err) {
                          console.error('Error writing to file:', err);
                        }
                      });
                    } catch (ex) {
                      console.log(ex)
                    }

                  }
                })
              }).catch((err) => {
                console.error(`Error fetching URL ${indivArticle.$.xmlUrl}:`, err);
              });
            })
          })
        })
      })
    } catch (error) {

    }

  })

}



function insertRssListIntoDb(rssList) {
  return new Promise((resolve, reject) => {
    //rss_list table has id as primary key, rss_url, category, title, last_updated


  })
}

function insertCategoryListIntoDb(categoryList: String[]) {
  return new Promise((resolve, reject) => {
    //category_list has id as primary key  , name
    const sql = `INSERT INTO category_list;`
    try {
      connection.query(sql, (err: QueryError, result) => {
        if (err) throw err;
        resolve(result);
      })
    }
    catch (error) {
      console.log(error)
    }
  });
}