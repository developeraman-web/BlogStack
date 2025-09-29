import BlogCard from "@/components/BlogCard";
import Loading from "@/components/Loading";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { useParams } from "react-router-dom";
import { TbCategory } from "react-icons/tb";

export default function BlogByCategory() {
  const { category } = useParams();
  const {
    data: blogData,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/get-blog-by-category/${category}`,
    {
      method: "get",
      credentials: "include",
    },
    [category]
  );

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="mb-4 pb-3 flex gap-2 items-center font-bold md:text-2xl text-md text-violet-500 border-b">
        <TbCategory />
        <h1>{blogData ? blogData.categoryData?.name : ""}</h1>
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
            <div>data not found..</div>
          </>
        )}
      </div>
    </>
  );
}
