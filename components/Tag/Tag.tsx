import Link from "next/link";
import React from "react";

type Tags = {
  tags: string[];
};
const Tag = (props: Tags) => {
  const { tags } = props;

  return (
    <div className="mx-4">
      <section className="lg:w-2/3 mb-8 mx-auto bg-orange-300 rounded-md p-5 shadow-2xl hover:none hover:translate-y-1 duration-300 transition-all">
        <div className="font-medium mb-4">タグ検索</div>
        <div className="flex flex-wrap gap-5">
          {tags.map((tag: string, index: number) => (
            <Link href={`/posts/tag/${tag}/page/1`} key={index}>
              <span className="cursor-pointer px-2 font-medium pb-1 rounded-md bg-sky-800 text-gray-200 inline-block">
                {tag}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Tag;
