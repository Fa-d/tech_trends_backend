import { QueryError } from 'mysql2';
import connection from "../../infrastructure/db";
import { FeedChildItem } from '../models/allModels';

export class FeedChildListRepo {
  async insertFeedListItems(itemList: string[][]) {
    const sql = `INSERT INTO  feed_child_list (
    category_id,
    
    category_name,
    company_name,
    company_site,

    company_feed_url,
    company_logo_url,
    company_description,

    feed_title,
    feed_content,
    feed_image,

    feed_author,
    feed_article_url,
    date_posted
) VALUES ?
`
    try {
      connection.query(sql, [itemList], (err: QueryError, result: any) => {
        if (err) throw err;
        console.log('Insert: ', "saveAllChildLists");
      })
    } catch (err) {
      console.log(err)
    }
  }


  async getAllFeedListItems() {
    const sql = `SELECT category_id,category_name, company_name, company_site,company_feed_url, company_logo_url, company_description, feed_title, feed_content, feed_image,  feed_author, feed_article_url, date_posted  FROM feed_child_list;`
    return new Promise((resolve, reject) => {
      try {
        connection.query(sql, (err: QueryError, result: FeedChildItem[]) => {
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


  async getAllFeedListItemByCategory(category: string) {
    const sql = `SELECT category_id,category_name, company_name, company_site,company_feed_url, company_logo_url, company_description, feed_title, feed_content, feed_image,  feed_author, feed_article_url, date_posted  FROM feed_child_list WHERE category_name='${category}'`
    return new Promise((resolve, reject) => {
      try {
        connection.query(sql, (err: QueryError, result: FeedChildItem[]) => {
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


  async getFeedById(id: number) {
    const sql = `SELECT category_id,category_name, company_name, company_site,company_feed_url, company_logo_url, company_description, feed_title, feed_content, feed_image,  feed_author, feed_article_url, date_posted  FROM feed_child_list WHERE id='${id}'`
    return new Promise((resolve, reject) => {
      try {
        connection.query(sql, (err: QueryError, result: FeedChildItem[]) => {
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