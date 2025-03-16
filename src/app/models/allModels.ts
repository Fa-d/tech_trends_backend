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
  feed_url: string,
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


export type FeedChildItem = {
  category_id: number
  category_name: string

  company_name: string
  company_site: string
  company_feed_url: string
  company_logo_url: string
  company_description: string

  feed_title: string
  feed_content: string
  feed_image: string
  feed_author: string
  feed_article_url: string
  date_posted: string
}


interface OutlineItem {
  $: {
    text: string;
    title: string;
    type?: string; 
    xmlUrl?: string; 
  };
  outline?: OutlineItem[]; 
}
interface BodyItem {
  outline: OutlineItem[];
}

export interface OpmlMain {
  opml: {
    body: BodyItem[];
  };
}