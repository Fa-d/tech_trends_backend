import RssParser from 'rss-parser';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';

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

function parsingUrl() {
    xmlList.slice(0, 5).forEach(async elem => {
        await rssparser.parseURL(elem).then(feed => {
            feed.items.forEach(element => {
                console.log(element.link)
            })
        }).catch(function () { });
    })
}




