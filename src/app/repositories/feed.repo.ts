import { QueryError } from 'mysql2';
import connection from "../../infrastructure/db";
import { FeedByCategory } from '../models/allModels';

export class FeedRepo {


  async getFeedsByCategory(category: string) {
    const sql = `SELECT id, title, link, feedUrl, feed_topic FROM feeds WHERE feed_topic = '${category}';`
    return new Promise((resolve, reject) => {
      try {
        connection.query(sql, (err: QueryError, result: FeedByCategory[]) => {
          if (err) throw err;
          resolve(result);
        })
      }
      catch (err) {
        console.log(err)
        reject(err);
      }
    });
  }

  async getAllFeeds() {
    const sql = `SELECT id, title, link, feedUrl, feed_topic FROM feeds;`
    return new Promise((resolve, reject) => {
      try {
        connection.query(sql, (err: QueryError, result: FeedByCategory[]) => {
          if (err) throw err;
          resolve(result);
        })
      }
      catch (err) {
        console.log(err)
        reject(err);
      }
    });
  }


  async insertAllFeeds(itemList: string[][]) {
    const sql = "INSERT INTO `feeds` (`title`, `link`, `feed_url`, `feed_topic`)  VALUES ?"
    try {
      connection.query(sql, [itemList], (err: QueryError, result: any) => {
        if (err) throw err;
        console.log('Insert: ', "saveAllRssUrls");
      })
    } catch (err) {
      console.log(err)
    }
  }

}
