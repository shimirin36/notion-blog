import Pagination from "@/components/Pagination/Pagination";
import SinglePost from "@/components/Post/SinglePost";
import Tag from "@/components/Tag/Tag";
import { getAllTags, getNumberOfPagesByTag, getPostsByTag } from "@/lib/notionAPI";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

type Posts = {
  posts: {
    id: string;
    title: string;
    description: string;
    date: string;
    slug: string;
    tags: string[];
  }[];
  numberOfPagesByTag: number;
  currentTag: string;
  allTags: string[];
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allTags = await getAllTags();

  let params: { params: { tag: string; page: string } }[] = [];

  await Promise.all(
    allTags.map((tag: string) => {
      // タグに応じたページ数の分だけパラメータをpushする
      return getNumberOfPagesByTag(tag).then((getNumberOfPagesByTag: number) => {
        for (let i = 1; i <= getNumberOfPagesByTag; i++) {
          params.push({ params: { tag: tag, page: i.toString() } });
        }
      });
    })
  );
  return {
    paths: params,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const currentPage: string = context.params?.page?.toString()!;
  const currentTag: string = context.params?.tag?.toString()!;
  const numberOfPagesByTag = await getNumberOfPagesByTag(currentTag);
  const posts = await getPostsByTag(currentTag, parseInt(currentPage, 10));
  const allTags = await getAllTags();

  return {
    props: {
      posts,
      numberOfPagesByTag,
      currentTag,
      allTags,
    },
    revalidate: 30,
  };
};

const BlogTagPageList = ({ posts, numberOfPagesByTag, currentTag, allTags }: Posts) => {
  return (
    <div className="container h-full w-full mx-auto">
      <Head>
        <title>Notion-Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container w-full mt-10">
        <h1 className="text-5xl font-medium text-center mb-16">Notion Blog🚀</h1>
        <section className="sm:grid grid-cols-2 w-5/6 gap-5 mx-auto">
          {posts.map((post) => (
            <div key={post.id}>
              <SinglePost
                id={post.id}
                title={post.title}
                description={post.description}
                date={post.date}
                slug={post.slug}
                tags={post.tags}
                isPaginationPage={true}
              />
            </div>
          ))}
        </section>
        <Pagination numberOfPage={numberOfPagesByTag} tag={currentTag} />
        <Tag tags={allTags} />
      </main>
    </div>
  );
};

export default BlogTagPageList;
