import Link from "next/link";
import React, { Key } from "react";

type Props = {
  id: string;
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
};

const SinglePost = (props: Props) => {
  const { title, description, date, slug, tags } = props;
  return (
    <section className="lg:w-1/2 bg-sky-900 mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300">
      <div className="flex items-center gap-3">
        <h2 className="text-gray-100 text-2xl font-medium mb-2">
          <Link href={`/posts/${slug}`}>{title}</Link>
        </h2>
        <h2 className="text-gray-100">{date}</h2>
        {tags.map((tag: string, index: number) => (
          <span
            key={index}
            className="text-white bg-gray-500 rounded-xl px-2 pb-1 font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="text-gray-100">{description}</p>
    </section>
  );
};

export default SinglePost;
