import connection from "../db";
import { FieldPacket, QueryError } from 'mysql2';

interface IOpmlRepository {
  saveAllRssUrls(itemList: string[])
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

}

