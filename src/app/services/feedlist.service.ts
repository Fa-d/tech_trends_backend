import { FeedListRepo } from '../repositories/feedlist.repo';

export class FeedListService {
  private feedListService: FeedListRepo;

  constructor() {
    this.feedListService = new FeedListRepo()
  }

  async insertFeedListItems() {
    let response = await this.feedListService.insertFeedListItems()
    return response
  }
  async getAllFeedListItems() {
    let response = await this.feedListService.getAllFeedListItems()
    return response
  }
  async getAllFeedListItemByCategory() {
    let response = await this.feedListService.getAllFeedListItemByCategory()
    return response
  }

  async getAllCategory() {
    let response = await this.feedListService.getAllFeedListItemByCategory()
    return response
  }

}