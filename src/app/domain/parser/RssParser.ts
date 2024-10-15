import Parser from 'rss-parser';
import { FeedCategoryResponse, FeedResponse, OpmlXmlRes } from '../../models/allModels';
import OpmlService from '../../services/opml.service';
import FeedService from '../../services/feed.service';
import { CategoryListService } from '../../services/categorylist.service';


const parser: Parser<FeedResponse> = new Parser({});

export async function parsingRss(): Promise<any> {
  const opmlService = new OpmlService()
  const feedService = new FeedService()
  const categoryListService = new CategoryListService()
  var allFeed: string[][] = []
  var feed: FeedResponse
  const titleMap = {}
  let response: OpmlXmlRes[] = await opmlService.getAllRssUrls()

  return new Promise(async (resolve, reject) => {

     let categoryNameId = await categoryNameIdFormat(response, categoryListService);

    for (const item of response) {
      try {
        feed = await parser.parseURL(item.rss_url);
        const tempArray = [
          feed.title,
          feed.link,
          feed.feedUrl,
          item.topic_title
        ]
        allFeed.push(tempArray)

      } catch (err) { }

    }


    feedService.insertAllFeeds(allFeed)
    resolve(allFeed);
  })

}


async function categoryNameIdFormat(response: OpmlXmlRes[], categoryListService: CategoryListService) {
  const topicTitles = new Set(response.map(item => item.topic_title));
  const topicTitlesArray = [];

  topicTitles.forEach(item => {
    topicTitlesArray.push([item]);
  });

  await categoryListService.insertIntoCategoryItems(topicTitlesArray)
  var categoryList: FeedCategoryResponse[] = await categoryListService.getAllCategory();
  let categoryNameId = {};
  categoryList.forEach(item => {
    categoryNameId[item.name] = item.id;
  });
  return categoryNameId;
}

