import { Client } from "@notionhq/client";

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// 全記事取得（100件）
export const getAllPosts = async () => {
  const posts = await notion.databases.query({
    database_id: `${process.env.NOTION_DB_ID}`,
    page_size: 100,
  });
  const allPosts = posts.results;
  return allPosts.map((post) => {
    return getPagesMetaData(post);
  });
};

const getPagesMetaData = (
  post: any
): {
  id: string;
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
} => {
  const getTags = (tags: []) => {
    const allTags: string[] = tags.map((tag: { name: string }) => {
      return tag.name;
    });
    return allTags;
  };

  return {
    id: post.id,
    title: post.properties.Name.title[0].plain_text,
    description: post.properties.Description.rich_text[0].plain_text,
    date: post.properties.Date.date.start,
    slug: post.properties.Slug.rich_text[0].plain_text,
    tags: getTags(post.properties.Tag.multi_select),
  };
};
