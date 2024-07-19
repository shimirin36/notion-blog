import Link from "next/link";
import React, { Key } from "react";

type Props = {
  id: string;
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
  isPaginationPage: boolean;
};

const SinglePost = (props: Props) => {
  const { title, description, date, slug, tags, isPaginationPage } = props;
  return (
    <>
      {isPaginationPage ? (
        <section className="sm:max-w-md md:max-w-lg md-lg:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-2xl bg-sky-900 mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300">
          <div className="lg:flex items-center ">
            <h2 className="text-gray-100 text-2xl font-medium mb-2 mr-2">
              <Link href={`/posts/${slug}`}>{title}</Link>
            </h2>
            <h2 className="text-gray-400 mr-2">{date}</h2>
            {tags.map((tag: string, index: number) => (
              <Link href={`/posts/tag/${tag}/page/1`} key={index}>
                <span className="text-white bg-gray-500 rounded-xl px-2 pb-1 font-medium mr-2">
                  {tag}
                </span>
              </Link>
            ))}
          </div>
          <p className="text-gray-100">{description}</p>
        </section>
      ) : (
        <section className="lg:w-2/3 bg-sky-900 mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-3">
            <h2 className="text-gray-100 text-2xl font-medium mb-2">
              <Link href={`/posts/${slug}`}>{title}</Link>
            </h2>
            <h2 className="text-gray-400">{date}</h2>
            {tags.map((tag: string, index: number) => (
              <Link href={`/posts/tag/${tag}/page/1`} key={index}>
                <span
                  key={index}
                  className="text-white bg-gray-500 rounded-xl px-2 pb-1 font-medium"
                >
                  {tag}
                </span>
              </Link>
            ))}
          </div>
          <p className="text-gray-100">{description}</p>
        </section>
      )}
    </>
  );
};

export default SinglePost;
