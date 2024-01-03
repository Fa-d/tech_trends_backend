import RssParser from 'rss-parser';
import hash from 'object-hash';
const rssparser = new RssParser({ preserveWhitespace: true });

await rssparser.parseURL("http://blog.klipse.tech//feed.xml")
    .then(feed => {
        feed.items.forEach(element => {
            //   console.log(hash(element))
            // element.categories.forEach(dataItem => { })
            console.log( element.link)
        })

       

        var motherObject = {
            title: "",
            companySite: "",
            articleTitle: "",
            image: "",
            subItem: [{
                title: "",
                articleUrl: "",
                pubDate: "",
                summary: ""
            }]
        }

    })
    .catch(function () { });


