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
  return allPosts;
};
