import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <Layout darkMode={darkMode}>
      <div className="flex justify-center items-center">
        <div
          className={`mr-3 w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
            darkMode ? "bg-green-500" : ""
          }`}
          onClick={toggleDarkMode}
        >
          <div
            className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${
              darkMode ? "translate-x-6" : ""
            }`}
          ></div>
        </div>
        <p>{darkMode ? "Dark Mode" : "Light Mode"}</p>
      </div>

      <Component {...pageProps} />
    </Layout>
  );
}
