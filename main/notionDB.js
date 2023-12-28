import axios from 'axios';
import RssParser from 'rss-parser';
import 'dotenv/config';

const parser = new RssParser({ preserveWhitespace: true });

let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `https://api.notion.com/v1/databases/${process.env.NOTION_DB}/query`,
    headers: { 'Authorization': `${process.env.NOTION_AUTH_KEY}`, 'Notion-Version': '2022-06-28' }
};


function processData() {
    var dataList = []
    axios.request(config).then((response) => {
        response.data.results.forEach(element => (
            dataList.push(
                {
                    companyName: element.properties.companyName.rich_text[0].text.content,
                    companyUrl: element.properties.companyUrl.url,
                    xmlUrl: element.properties.xmlUrl.rich_text[0].text.content
                }
            )));
        parsingUrl(dataList.slice(0, 5))
    }).catch((error) => {
        console.log(error);
    }).finally(() => {

    });
}

processData()

function parsingUrl(dataList) {
    console.log(dataList.length)
    dataList.forEach(async elem => {
        await parser.parseURL(elem.xmlUrl).then(feed => {
            feed.items.forEach(element => {
                console.log(element.link)
            })
        }).catch(function (error) { });
    })

}
