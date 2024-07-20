import Link from "next/link";
import React, { Key, useEffect, useRef, useState } from "react";
import { isContext } from "vm";

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
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const checkOverflow = (element: HTMLDivElement) => {
      return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
      );
    };

    const handleResize = () => {
      if (contentRef.current) {
        setIsOverflowing(checkOverflow(contentRef.current));
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isPaginationPage ? (
        <section className="container bg-sky-900 mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300">
          <div className="lg:flex items-center">
            <h2 className="text-gray-100 text-2xl font-medium mb-2 mr-2 truncate max-w-full">
              <Link href={`/posts/${slug}`}>{title}</Link>
            </h2>
          </div>
          <div
            ref={contentRef}
            className={`pb-2 ${
              isOverflowing
                ? "overflow-x-hidden hover:overflow-x-scroll custom-scrollbar"
                : ""
            }`}
          >
            {tags.map((tag: string, index: number) => (
              <Link href={`/posts/tag/${tag}/page/1`} key={index}>
                <span className="text-white bg-gray-500 rounded-xl px-2 pb-1 font-medium mr-2">
                  {tag}
                </span>
              </Link>
            ))}
          </div>
          <div className="text-gray-100 truncate max-w-full">{description}</div>
        </section>
      ) : (
        <section className="lg:w-2/3 bg-sky-900 mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-3">
            <h2 className="text-gray-100 text-2xl font-medium mb-2 truncate max-w-full">
              <Link href={`/posts/${slug}`}>{title}</Link>
            </h2>
          </div>
          <div
            ref={contentRef}
            className={`pb-2 ${
              isOverflowing
                ? "overflow-x-hidden hover:overflow-x-scroll custom-scrollbar"
                : ""
            }`}
          >
            {tags.map((tag: string, index: number) => (
              <Link href={`/posts/tag/${tag}/page/1`} key={index}>
                <span className="text-white bg-gray-500 rounded-xl px-2 pb-1 font-medium mr-2 ">
                  {tag}
                </span>
              </Link>
            ))}
          </div>
          <div className="text-gray-100 truncate max-w-full">{description}</div>
        </section>
      )}
    </>
  );
};

export default SinglePost;
