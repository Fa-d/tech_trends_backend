import { QueryError } from 'mysql2';
import connection from "../../../infrastructure/db/index";
import { FeedCategoryResponse } from '../../models/allModels';

export class CategoryListRepo {
  async insertIntoCategoryItems(categoryName: string[][]) {
    const sql = `INSERT IGNORE INTO feed_category_list (name) VALUES ?;`
    return new Promise((resolve, reject) => {
      try {
        connection.query(sql, [categoryName], (err: QueryError, result: any) => {
          if (err) throw err;
          console.log(`Inserted category: ',${categoryName}`);
          resolve(result);
        })
      } catch (error) {
        console.log(error)
      }
    });
  }


  async getAllCategory(): Promise<FeedCategoryResponse[]> {
    const sql = `SELECT id, name FROM feed_category_list WHERE LENGTH(name) < 10;`
    return new Promise((resolve, reject) => {
      try {
        connection.query(sql, (err: QueryError, result: FeedCategoryResponse[]) => {
          if (err) throw err;
          resolve(result);
        })
      } catch (error) {
        console.log(error)
      }
    });
  }
}