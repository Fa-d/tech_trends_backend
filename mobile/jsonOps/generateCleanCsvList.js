import { parse } from 'csv-parse';
import { createReadStream, createWriteStream } from 'fs';
import RssParser from 'rss-parser';

const rssparser = new RssParser({ preserveWhitespace: true });
var xmlList = [];
const fileName = './opml.csv';
const writeStream = createWriteStream('./filtered.csv');
const csvParser = parse({ delimiter: ',' });
csvParser.on('readable', function () {
    let record;
    while ((record = csvParser.read()) !== null) {
        xmlList.push(record[0])
    }
});

createReadStream(fileName).pipe(csvParser).on("end", async () => {
    var tempList = {}
    await Promise.all(xmlList.map(async (elem) => {
        await rssparser.parseURL(elem).then(data => {
            tempList[data] = true
        }).catch(exce => { })
    }))

    for (let urlItem in tempList) {
        writeStream.write(`${urlItem}\n`)
    }
});


