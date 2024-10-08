import exp from 'constants';

export interface OpmlXmlRes {
  id: number,
  create_time: string,
  topic_title: string,
  article_title: string,
  rss_url: string
}


export interface OpmlOutline {
  text: string;
  type?: string;
  xmlUrl?: string;
  htmlUrl?: string;
  children?: OpmlOutline[];
}

export interface OpmlDocument {
  title: string;
  outlines: OpmlOutline[];
}



export type FeedItem = {
  title: string,
  link: string,
  pubDate: string,
  author: string,
  content: string,
  contentSnippet: string,
  id: string,
  isoDate: string
};
export type FeedResponse = {
  items: FeedItem[],
  link: string,
  feedUrl: string,
  title: string,
  lastBuildDate: string
};

export type FeedByCategory = {
  id: number,
  title: string,
  link: string,
  feedUrl: string,
  feed_topic: string,
}

export type FeedCategoryResponse = {
  id: number,
  name: string
}
