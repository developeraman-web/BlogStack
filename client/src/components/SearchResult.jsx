import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { useSearchParams } from "react-router-dom";
import BlogCard from "./BlogCard";
import { TbCategory } from "react-icons/tb";
import Loading from "./Loading";

export default function SearchResult() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const {
    data: blogData,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/search?q=${q}`,
    {
      method: "get",
      credentials: "include",
    },
    [q]
  );

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="mb-4 pb-3 flex gap-2 items-center font-bold md:text-2xl text-md text-violet-500 border-b">
        <TbCategory />
        <h1 className="w-full">Result for {`'${q}'`}</h1>
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 transition-all duration-300">
        {blogData && blogData.blog && blogData.blog.length > 0 ? (
          <>
            {blogData.blog.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </>
        ) : (
          <>
            <div className="col-span-3">No blogs available for {`'${q}'`}</div>
          </>
        )}
      </div>
    </>
  );
}
