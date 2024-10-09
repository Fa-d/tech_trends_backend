import { OpmlXmlRes } from '../models/allModels';
import { OpmlRepository } from '../repositories/opml.dbRepo';


class OpmlService {
  private opmlRepo: OpmlRepository;

  constructor() {
    const opmlRepo = new OpmlRepository()
    this.opmlRepo = opmlRepo;
  }


  async getAllRssUrls(): Promise<OpmlXmlRes[]> {
    let response = await this.opmlRepo.getAllRssUrls()
    return response
  }

  async saveAllRssUrls(itemList: string[]) {
    this.opmlRepo.saveAllRssUrls(itemList);
  }

}

export default OpmlService;
