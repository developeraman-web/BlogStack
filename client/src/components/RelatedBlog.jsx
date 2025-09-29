import { getEnv } from "@/helpers/getEnv";
import { RouteBlogDetails } from "@/helpers/RouteName";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { Link } from "react-router-dom";

export default function RelatedBlog({ category, currentBlog }) {
  const {
    data: relatedData,
    loading,
    error,
  } = useFetch(
    `${getEnv(
      "VITE_API_BASE_URL"
    )}/blog/get-related-blog/${category}/${currentBlog}`,
    {
      method: "GET",
      credentials: "include",
    },
    []
  );

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold mb-4">Related Blogs</h2>
      <div className="space-y-4">
        {relatedData && relatedData.blog.length > 0 ? (
          <>
            {relatedData.blog?.map((singleblog) => (
              <Link
                key={singleblog._id}
                to={RouteBlogDetails(category, singleblog.slug)}
              >
                <div
                  key={singleblog._id}
                  className="flex gap-3 items-center border rounded p-2"
                >
                  <div className=" overflow-hidden rounded">
                    <img
                      className="w-28 h-20 object-cover"
                      src={singleblog.featureImage}
                      alt={singleblog.title}
                    />
                  </div>

                  <h4 className="text-sm font-medium break-words line-clamp-2">
                    {singleblog.title}
                  </h4>
                </div>
              </Link>
            ))}
          </>
        ) : (
          <>No Related blogs available...</>
        )}
      </div>
    </div>
  );
}
