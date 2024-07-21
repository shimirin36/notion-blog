import Link from "next/link";
import React from "react";

type Props = {
  tag: string;
  numberOfPage: number;
};

const Pagination = (props: Props) => {
  const { tag, numberOfPage } = props;
  let pages: number[] = [];
  for (let i = 1; i <= numberOfPage; i++) {
    pages.push(i);
  }

  return (
    <section className="mb-8 lg:w-1/2 mx-auto rounded-md p-5">
      <ul className="flex items-center justify-center gap-5">
        {pages.map((page, index) => (
          <li key={index} className="bg-sky-900 rounded-lg w-6 h-8 relative ">
            <Link
              href={tag ? `/posts/tag/${tag}/page/${page}` : `/posts/page/${page}`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-300"
            >
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Pagination;
