import React from "react";

type Props = {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string;
};

const SinglePost = (props: Props) => {
  const { title, description, date, slug, tags } = props;
  return <div>{tags}</div>;
};

export default SinglePost;
