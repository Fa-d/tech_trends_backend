import connection from "../db";
import { FieldPacket, QueryError } from 'mysql2';

interface IOpmlRepository {
  saveAllRssUrls(itemList: string[])

  getAllRssUrls()
}


export interface OpmlXmlRes {
  id: number,
  create_time: string,
  topic_title: string,
  article_title: string,
  rss_url: string
}

export class OpmlRepository implements IOpmlRepository {
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
          console.log('getAllRss: ', result);
        })
      }
      catch (err) {
        console.log(err)
        reject(err);
      }
    });
  }
}

