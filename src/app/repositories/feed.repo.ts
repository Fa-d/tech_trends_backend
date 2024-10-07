import { QueryError } from 'mysql2';
import connection from "../../infrastructure/db";
import { FeedByCategory, FeedResponse } from '../models/allModels';

export class FeedRepo {
  async getAllFeedCategory() {
    const sql = 'SELECT DISTINCT feed_topic FROM feeds';
    return new Promise((resolve, reject) => {
      try {
        connection.query(sql, (err: QueryError, result: string[]) => {
          if (err) throw err;
          const topics = result.map(topic => topic['feed_topic']);
          resolve(topics);
        })
      }
      catch (err) {
        console.log(err)
        reject(err);
      }
    });
  }

  async getFeedsByCategory(category: string) {
    const sql = `SELECT title, link, feedUrl, feed_topic FROM feeds WHERE feed_topic = '${category}';`
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
}
