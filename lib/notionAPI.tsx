import { NUMBER_OF_POST_PER_PAGE } from "@/constants/constants";
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

// 記事のMetaData取得
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

// TOPページ用記事の取得
export const getPostsApperance = async (pageSize: number) => {
  const allPosts = await getAllPosts();
  const appearancePosts = allPosts.slice(0, pageSize);
  return appearancePosts;
};

// page番号に応じた記事の情報の取得
export const getPostByPage = async (page: number) => {
  const allPosts = await getAllPosts();
  const startIndex = (page - 1) * NUMBER_OF_POST_PER_PAGE;
  const endIndex = startIndex + NUMBER_OF_POST_PER_PAGE;
  return allPosts.slice(startIndex, endIndex);
};

export const getNumberOfPages = async () => {
  const allPosts = await getAllPosts();
  return (
    Math.floor(allPosts.length / NUMBER_OF_POST_PER_PAGE) +
    (allPosts.length % NUMBER_OF_POST_PER_PAGE > 0 ? 1 : 0)
  );
};

export const getPostsByTag = async (tagName: string, page: number) => {
  const allPosts = await getAllPosts();
  const posts = allPosts.filter((post) =>
    post.tags.find((tag: string) => tag == tagName)
  );

  const startIndex = (page - 1) * NUMBER_OF_POST_PER_PAGE;
  const endIndex = startIndex + NUMBER_OF_POST_PER_PAGE;
  return posts.slice(startIndex, endIndex);
};

export const getAllTags = async () => {
  const allPosts = await getAllPosts();
  const noneDuplicationTags = allPosts.flatMap((post) => post.tags);
  const allTagList = [...new Set(noneDuplicationTags)];
  return allTagList;
};

export const getNumberOfPagesByTag = async (tagName: string) => {
  const allPosts = await getAllPosts();
  const posts = allPosts.filter((post) =>
    post.tags.find((tag: string) => tag == tagName)
  );
  return (
    Math.floor(posts.length / NUMBER_OF_POST_PER_PAGE) +
    (posts.length % NUMBER_OF_POST_PER_PAGE > 0 ? 1 : 0)
  );
};
