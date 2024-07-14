import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md/build/notion-to-md";

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

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

// 記事詳細取得
export const getSinglePost = async (slug: string) => {
  const response = await notion.databases.query({
    database_id: `${process.env.NOTION_DB_ID}`,
    filter: {
      property: "Slug",
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });

  const page = response.results[0];
  const metadata = getPagesMetaData(page);
  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdBlocks);
  return { metadata, markdown: mdString };
};
