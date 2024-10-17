import { FeedChildListRepo } from '../repositories/feedchildlist.repo';

export class FeedChildListService {
  private feedListService: FeedChildListRepo;

  constructor() {
    this.feedListService = new FeedChildListRepo()
  }

  async insertFeedListItems(itemList: string[][]) {
    let response = await this.feedListService.insertFeedListItems(itemList)
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