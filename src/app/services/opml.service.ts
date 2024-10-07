import { FeedParent, FeedResponse, OpmlXmlRes } from '../models/allModels';
import { OpmlRepository } from '../repositories/opml.dbRepo';


class OpmlService {
  private opmlRepo: OpmlRepository;

  constructor() {
    const opmlRepo = new OpmlRepository()
    this.opmlRepo = opmlRepo;
  }


  async getAllFeeds(): Promise<FeedParent[]> {
    let response = await this.opmlRepo.getAllFeeds()
    return response
  }

  async getAllRssUrls(): Promise<OpmlXmlRes[]> {
    let response = await this.opmlRepo.getAllRssUrls()
    return response
  }

  async saveAllRssUrls(itemList: string[]) {
    this.opmlRepo.saveAllRssUrls(itemList);
  }

  async insertAllFeeds(itemList: string[][]){
    this.opmlRepo.insertAllFeeds(itemList);

  }

}

export default OpmlService;
