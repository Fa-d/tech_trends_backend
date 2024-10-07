import { FeedRepo } from '../repositories/feed.repo';


class FeedService {
  private feedService: FeedRepo

  constructor() {
    this.feedService = new FeedRepo()
  }
  async getAllFeeds() {
    let response = await this.feedService.getAllFeedCategory()
    return response
  }

  async getFeedsByCategory(category: string) {
    let response = await this.feedService.getFeedsByCategory(category)
    return response
  }


}


export default FeedService;