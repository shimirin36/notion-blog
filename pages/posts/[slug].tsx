import { getAllPosts, getSinglePost } from "@/lib/notionAPI";
import Link from "next/link";
import React from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

type Params = {
  params: {
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
    revalidate: 60 * 60,
  };
};

const Post = ({ post }: any) => {
  return (
    <section className="container lg:px-2 px-5 h-screen lg:w-2/3 mx-auto mt-10">
      <h2 className="w-full text-3xl font-medium">{post.metadata.title}</h2>
      <div className="border-b-4 w-1/2 border-sky-700"></div>
      <span className="text-gray-500">投稿日：{post.metadata.date}</span>
      <br />
      {post.metadata.tags.map((tag: string, index: number) => (
        <p
          key={index}
          className="text-white bg-sky-950 rounded-xl font-medium mt-2 mx-0.5 px-2  inline-block"
        >
          {tag}
        </p>
      ))}
      <div className="mt-10 font-medium">
        <Markdown
          components={{
            code(props) {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  {...rest}
                  PreTag="div"
                  children={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  style={coldarkDark}
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {post.markdown.parent}
        </Markdown>
        <Link href={"/"}>
          <div className="pb-20 inline-block mt-7 hover:text-sky-700 ">←back</div>
        </Link>
      </div>
    </section>
  );
};

export default Post;
