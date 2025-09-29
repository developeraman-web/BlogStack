import BlogCard from "@/components/BlogCard";
import Loading from "@/components/Loading";
import { useSidebar } from "@/components/ui/sidebar";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { TbCategory, TbLayoutSidebarLeftCollapse } from "react-icons/tb";

export default function Index() {
  const {
    data: blogData,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/get-all`,
    {
      method: "get",
      credentials: "include",
    },
    []
  );
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="mb-4 pb-3 flex gap-2 items-center font-bold md:text-2xl text-md text-violet-500 border-b transition-all duration-700">
        <TbCategory />
        <h1>Blog Stack</h1>
        {" | "}
        <h1 className="">Tech and Beyond</h1>
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
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
