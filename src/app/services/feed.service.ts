import { FeedRepo } from '../repositories/feed.repo';


class FeedService {
  private feedService: FeedRepo

  constructor() {
    this.feedService = new FeedRepo()
  }

  async getFeedsByCategory(category: string) {
    let response = await this.feedService.getFeedsByCategory(category)
    return response
  }

  async getAllFeeds() {
    let response = await this.feedService.getAllFeeds()
    return response
  }

  async insertAllFeeds(itemList: string[][]) {
    this.feedService.insertAllFeeds(itemList);

  }
}


export default FeedService;