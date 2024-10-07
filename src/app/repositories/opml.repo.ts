import { FeedParent } from '../models/allModels'

interface IOpmlRepository {
  saveAllRssUrls(itemList: string[])

  getAllRssUrls()

  insertAllFeeds(itemList: string[][])


  getAllFeeds(): Promise<FeedParent[]>
}
