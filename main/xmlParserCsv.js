import RssParser from 'rss-parser';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import 'dotenv/config';

var awsConfig = {
    region: `${process.env.DYNAMO_DB_REGION}`,
    credentials: {
        accessKeyId: `${process.env.ACCESS_KEY_ID}`,
        secretAccessKey: `${process.env.SECRET_ACCESS_KEY}`
    }
}

var xmlList = [];
const rssparser = new RssParser({ preserveWhitespace: true });
const fileName = 'main/opml.csv';
const csvParser = parse({ delimiter: ',' });

csvParser.on('readable', function () {
    let record;
    while ((record = csvParser.read()) !== null) {
        xmlList.push(record[0])
    }
});

createReadStream(fileName).pipe(csvParser).on("end", function () {
    parsingUrl()
});
var motherObject = {};
function parsingUrl() {
    xmlList.slice(0, 10).forEach(async elem => {
        await rssparser.parseURL(elem).then(async feed => {
            var feedItemList = []
            feed.items.forEach(element => {
                feedItemList.push({
                    title: element.title,
                    articleUrl: element.link,
                    pubDate: element.pubDate,
                    summary: element.summary
                })
            })
            motherObject = {
                title: feed.title,
                companySite: feed.link,
                articleTitle: feed.description,
                image: feed.image,
                innerItems: feedItemList
            }
        }).then(function () {
        }).catch(function () {});
    })
}





var putDataToTable = (async () => {
    const client = new DynamoDBClient(awsConfig);
    const response = await client.send(
        new PutCommand({
            TableName: "list_feed",
            Item: {
                urls: "pk",
                sort: "sk",
                url_list: [
                    {
                        articleCount: 22,
                        urlAdress: "http://www.abc929.com"
                    },
                    {
                        articleCount: 21,
                        urlAdress: "http://www.abc929.com"
                    },
                    {
                        articleCount: 23,
                        urlAdress: "http://www.abc929.com"
                    }
                ],
                articleData: motherObject
            }

        }));
})();

