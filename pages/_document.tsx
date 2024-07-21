import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="min-h-screen items-center justify-center rgb(255, 231, 200); dark:bg-gray-900 text-black dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
