import SinglePost from "@/components/Post/SinglePost";
import Tag from "@/components/Tag/Tag";
import { getAllTags, getPostsApperance } from "@/lib/notionAPI";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

type AllPosts = {
  appearancePosts: {
    id: string;
    title: string;
    description: string;
    date: string;
    slug: string;
    tags: string[];
  }[];
  allTags: string[];
};

export const getStaticProps: GetStaticProps = async () => {
  const appearancePosts = await getPostsApperance(6);
  const allTags = await getAllTags();
  return {
    props: {
      appearancePosts,
      allTags,
    },
    revalidate: 30,
  };
};

export default function Home({ appearancePosts, allTags }: AllPosts) {
  return (
    <div className="container h-full w-full mx-auto">
      <Head>
        <title>Notion-Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container w-full mt-10 ">
        <h1 className="text-5xl font-medium text-center mb-16">432のビボロク🖊📚</h1>
        {appearancePosts.map(
          (post: {
            id: string;
            title: string;
            description: string;
            date: string;
            slug: string;
            tags: string[];
          }) => (
            <div className="mx-4" key={post.id}>
              <SinglePost
                id={post.id}
                title={post.title}
                description={post.description}
                date={post.date}
                slug={post.slug}
                tags={post.tags}
                isPaginationPage={false}
              />
            </div>
          )
        )}
        <Link
          href="/posts/page/1"
          className="mb-10 lg:w-2/3 block mx-auto  px-5 py-5 hover:text-sky-800 text-right justify-normal"
        >
          ...More
        </Link>
        <Tag tags={allTags} />
      </main>
    </div>
  );
}
