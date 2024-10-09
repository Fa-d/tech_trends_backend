import connection from "../../infrastructure/db";
import { QueryError } from 'mysql2';
import { OpmlXmlRes } from '../models/allModels';


export class OpmlRepository {
  async saveAllRssUrls(itemList: string[]) {
    const sql = 'INSERT INTO `opml_list`(`topic_title`, `article_title`, `rss_url`, `create_time`) VALUES ?';
    try {
      connection.query(sql, [itemList], (err: QueryError, result: any) => {
        if (err) throw err;
        console.log('Insert: ', "saveAllRssUrls");
      })
    } catch (ex) {
      console.log(ex)
    }
  }

  async getAllRssUrls(): Promise<OpmlXmlRes[]> {
    const sql = "SELECT id,create_time,topic_title,article_title,rss_url FROM opml_list;"
    return new Promise((resolve, reject) => {
      try {
        connection.query(sql, (err: QueryError, result: OpmlXmlRes[]) => {
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

