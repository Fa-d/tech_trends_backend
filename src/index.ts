import { parseOpml } from './parser/OpmlParser';
import { parsingRss } from './parser/Parser';

const filePath = './asset/feeds.opml';  // Path to your OPML file

export const main = () => {
  //parsingRss()
  parseOpml()
};

main()


