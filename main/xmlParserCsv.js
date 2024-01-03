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

createReadStream(fileName).pipe(csvParser).on("end", async function () {
    parsingUrl()

});

async function parsingUrl() {

    var motherObject = [];
    await Promise.all(xmlList.slice(10, 13).map(async (xmlUrl) => {
        const feed = await rssparser.parseURL(xmlUrl);
        const feedItemList = feed.items.map(element => ({
            title: element.title || "",
            articleUrl: element.link || "",
            pubDate: element.pubDate || "",
            summary: element.summary || ""
        }));

        motherObject.push({
            title: feed.title || "",
            companySite: feed.link || "",
            articleTitle: feed.description || "",
            image: feed.image || "",
            innerItems: feedItemList || ""
        });
    }));

    new DynamoDBClient(awsConfig).send(
        new PutCommand({
            TableName: "list_feed",
            Item: {
                urls: "pk",
                sort: "sk",
                articleData: motherObject
            }
        }));
}


