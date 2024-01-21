import { parse } from 'csv-parse';
import { createReadStream, writeFile } from 'fs';
import RssParser from 'rss-parser';
import hasher from 'object-hash';


const rssparser = new RssParser({ preserveWhitespace: true });
var xmlList = [];
const fileName = './filtered.csv';
const csvParser = parse({ delimiter: ',' });
csvParser.on('readable', function () {
    let record;
    while ((record = csvParser.read()) !== null) {
        xmlList.push(record[0])
    }
});

createReadStream(fileName).pipe(csvParser).on("end", async () => {
    var motherCategories = []
    var childAtricles = []
    var motherArticle = []
    await Promise.all(xmlList.map(async (elem) => {
        await rssparser.parseURL(elem).then(copiedMotherObject => {
            var thisArticleItems = []
            copiedMotherObject.items.forEach(itemsInner => {
                var thisArticleCategories = []
                itemsInner.categories?.forEach(categoryItem => {
                    hashItemIntoArray(categoryItem, motherCategories)
                    thisArticleCategories.push(hasher(categoryItem))
                })
                var formatterArticleItem = getformatterArticleItem(itemsInner, thisArticleCategories)
                hashItemIntoArray(formatterArticleItem, childAtricles)
                thisArticleItems.push(hasher(formatterArticleItem))
            })
            copiedMotherObject["items"] = thisArticleItems
            hashItemIntoArray(copiedMotherObject, motherArticle)

        }).catch(exce => { console.log(exce) })
    }))

    const motherCategoriesjsonContent = JSON.stringify(motherCategories);
    const childAtriclesjsonContent = JSON.stringify(childAtricles);
    const motherArticlejsonContent = JSON.stringify(motherArticle);

    writeFile("./fileBuckets/categories.json", motherCategoriesjsonContent, 'utf8', function (err) {
        if (err) return console.log(err);
        console.log("The categories was saved!");
    });

    writeFile("./fileBuckets/childArticles.json", childAtriclesjsonContent, 'utf8', function (err) {
        if (err) return console.log(err);
        console.log("The childArticles was saved!");
    });

    writeFile("./fileBuckets/motherArticles.json", motherArticlejsonContent, 'utf8', function (err) {
        if (err) return console.log(err);
        console.log("The motherArticles was saved!");
    });
});


function hashItemIntoArray(item, mainList) {
    let tempJson = {};
    tempJson[hasher(item)] = item
    mainList.push(tempJson)
}

function getformatterArticleItem(item, passedCategories) {
    return {
        title: item.title,
        summary: item.summary,
        pubDate: item.pubDate,
        link: item.link,
        isoDate: item.isoDate,
        guid: item.guid,
        enclosure: item.enclosure,
        creator: item.creator,
        categories: passedCategories
    }
}

