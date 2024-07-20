import { getAllPosts, getSinglePost } from "@/lib/notionAPI";
import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

type Params = {
  params: {
    slug: string;
  };
};

type PostInfo = {
  post: {
    markdown: any;
    metadata: {
      id: string;
      title: string;
      description: string;
      date: string;
      slug: string;
      tags: string[];
    };
    slug: string;
  };
};

export const getStaticPaths = async () => {
  const allPosts = await getAllPosts();
  const paths = allPosts.map(({ slug }) => ({ params: { slug } }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const post = await getSinglePost(params.slug);
  return {
    props: { post },
    revalidate: 30,
  };
};

const Post = ({ post }: PostInfo) => {
  const dateObj = new Date(post.metadata.date);

  return (
    <section className="container lg:px-2 px-5 h-screen lg:w-2/3 mx-auto mt-10">
      <h2 className="break-words text-3xl font-medium">{post.metadata.title}</h2>
      <div className="border-b-4 w-full border-sky-700"></div>
      <span className="text-gray-500">投稿日：{dateObj.toLocaleString()}</span>
      <br />
      {post.metadata.tags.map((tag: string, index: number) => (
        <p
          key={index}
          className="text-white bg-sky-700 rounded-2xl font-medium mt-3 mx-1 px-3 inline-block"
        >
          <Link href={`/posts/tag/${tag}/page/1`}>{tag}</Link>
        </p>
      ))}
      <div className="mt-10 font-medium">
        <ReactMarkdown
          components={{
            code(props) {
              const { children, className } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter PreTag="div" language={match[1]} style={coldarkDark}>
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code>{children}</code>
              );
            },
          }}
        >
          {post.markdown.parent}
        </ReactMarkdown>
        <Link href={"/"}>
          <div className="pb-20 inline-block mt-7 hover:text-sky-700 ">←back</div>
        </Link>
      </div>
    </section>
  );
};

export default Post;
