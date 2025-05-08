import { read, readFile, appendFile } from 'fs';
import * as xml2js from 'xml2js';
import { FeedResponse, OpmlXmlRes, FeedCategoryResponse } from '../../models/allModels';
import Parser from 'rss-parser';
import connection from "../../../infrastructure/db/index";
import { QueryError } from 'mysql2';

const parser: Parser<FeedResponse> = new Parser({});

export async function insertIntoRssList() {
  return new Promise((resolve, reject) => {
    const filePath = './asset/feeds.opml';
    readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return
      }
      try {
        xml2js.parseStringPromise(data).then((result) => {
          result.opml.body.forEach(element => {
            const firstTenElements = element.outline.slice(0, 2);

            firstTenElements.forEach(sameCategoryArt => {
              sameCategoryArt.outline.forEach(async indivArticle => {
                await parser.parseURL(indivArticle.$.xmlUrl)
                  .then((newFeedRes) => {
                    newFeedRes['items'].forEach(item => {
                      const categories = item['categories'];

                      if (categories != null) {
                        let categoryList: string[] = [];
                        if (Array.isArray(categories)) {
                          categoryList = categories;
                        } else if (typeof categories === 'string') {
                          categoryList = categories.split(',');
                        }
                        insertCategoryListIntoDb(categoryList).then((listOfCategories: number[]) => {
                          // if no category found, query gpt
                          const categoryIdsString = listOfCategories.join(',');
                          console.log(`Category IDs: ${categoryIdsString}`);
                        })
                      }
                    })

                  }).catch((err) => {
                  });
              })
            })
          })
        })
      } catch (error) {
      }
    })
  })


}



function insertRssListIntoDb(rssList) {
  return new Promise((resolve, reject) => {
    //rss_list table has id as primary key, rss_url, category, title, last_updated
  })
}

function insertCategoryListIntoDb(categoryList: string[]) {
  return new Promise((resolve, reject) => {
    const uniqueCategories = Array.from(new Set(categoryList));
    const insertPromises = new Promise((innerResolve, innerReject) => {
      const sql = `INSERT IGNORE INTO category_list (name) VALUES (?)`;
      if (uniqueCategories.some(item => typeof item === 'string')) {
        connection.query(sql, uniqueCategories, (err: QueryError) => {
          if (err) {
            innerReject(err);
          } else {
            innerResolve(null);
          }
        });
      }

    });

    Promise.all([insertPromises])
      .then(() => {
        const fetchSql = `
        SELECT id 
        FROM category_list 
        WHERE name IN (?)
      `;
        connection.query(fetchSql, [uniqueCategories], (err: QueryError, results: any) => {
          if (err) {
            reject(err);
          } else {
            const categoryIds = results.map((row: { id: number }) => row.id);
            resolve(categoryIds);
          }
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
}