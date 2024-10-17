import Parser from 'rss-parser';
import { FeedCategoryResponse, FeedChildItem, FeedResponse, OpmlXmlRes } from '../../models/allModels';
import OpmlService from '../../services/opml.service';
import FeedService from '../../services/feed.service';
import { CategoryListService } from '../../services/categorylist.service';
import { FeedChildListService } from '../../services/feedchildlist.service';


const parser: Parser<FeedResponse> = new Parser({});

export async function parsingRss(): Promise<any> {
  const opmlService = new OpmlService()
  const feedListService = new FeedChildListService()
  const categoryListService = new CategoryListService()
  var allFeed: string[][] = []
  var newFeedRes = {}
  const titleMap = {}
  var newCategories = []
  let response: OpmlXmlRes[] = await opmlService.getAllRssUrls()

  return new Promise(async (resolve, reject) => {
    let categoryNameId = await categoryNameIdFormat(response, categoryListService);

    for (const itemResIter of response.slice(0, 50)) {
      try {
        newFeedRes = await parser.parseURL(itemResIter.rss_url);
        newFeedRes['items'].forEach(item => {
          var feedImage = "" //feed Image
          item['categories'].forEach(cate => {
            newCategories.push([cate])
          })

          if (item.enclosure && item.enclosure.url) {
            feedImage = item.enclosure.url
          } else if (item['media:content'] && item['media:content'].url) {
            feedImage = item['media:content'].url
          } else if (item.content) {
            const imageUrl = item.content.match(/<img[^>]+src="([^">]+)"/);
            if (imageUrl && imageUrl[1]) {
              feedImage = imageUrl[1]
            }
          }

          var newItem = [
            categoryNameId[itemResIter.topic_title], //category id,
         
            itemResIter.topic_title, // category name
            newFeedRes['title'], //company name
            newFeedRes['link'],  // company site url
          
            newFeedRes['feedUrl'], //comany feed url , 
            newFeedRes['image'].url, //company image, 
            newFeedRes['description'],//company description  , 
          

            item['title'], //feed title, 
            item['content:encoded'], //main feed article , 
            feedImage, 

            item['creator'], //feed author, 
            item['link'],//feed article url, 
            item['isoDate'], // date posted, 
          ]
          console.log(newItem)

          allFeed.push(newItem)
        })
      } catch (err) { }

    }

    await feedListService.insertFeedListItems(allFeed)
    await categoryListService.insertIntoCategoryItems(newCategories)
    resolve(allFeed);
  })

}


async function categoryNameIdFormat(response: OpmlXmlRes[], categoryListService: CategoryListService) {
  const topicTitles = new Set(response.map(item => item.topic_title));
  const topicTitlesArray = [];

  topicTitles.forEach(item => {
    topicTitlesArray.push([item]);
  });

  // await categoryListService.insertIntoCategoryItems(topicTitlesArray)
  var categoryList: FeedCategoryResponse[] = await categoryListService.getAllCategory();
  let categoryNameId = {};
  categoryList.forEach(item => {
    categoryNameId[item.name] = item.id;
  });
  return categoryNameId;
}

