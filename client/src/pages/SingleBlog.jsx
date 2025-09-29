import Comment from "@/components/Comment";
import Loading from "@/components/Loading";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import userIcon from "@/assets/images/user.png";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { useFetch } from "@/hooks/useFetch";
import { decode } from "entities";
import moment from "moment";
import React from "react";
import { useParams } from "react-router-dom";
import { IoMdTime } from "react-icons/io";
import Commentcount from "@/components/Commentcount";
import LikeCount from "@/components/LikeCount";
import RelatedBlog from "@/components/RelatedBlog";

export default function SingleBlog() {
  const { slug, category } = useParams();
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/get-blog/${slug}`,
    {
      method: "GET",
      credentials: "include",
    },
    [slug]
  );
  if (error) {
    showToast("error", error);
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <div className=" lg:flex-nowrap flex-wrap flex justify-between gap-6">
      {data && data.blog ? (
        <>
          <div
            id="singleBlogContainer"
            className="border rounded lg:w-[70%] w-full md:p-5 p-3.5"
          >
            <section id="blogHeader">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={data.blog.author.avatar || userIcon} />
                  </Avatar>
                  <div className="font-bold text-lg">
                    {data.blog.author.name}
                    <div className="flex items-center gap-1 font-light text-xs">
                      <IoMdTime />
                      {moment(data.blog.createdAt).format("DD-MM-YYYY")}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <LikeCount blogId={data.blog._id} />
                  <Commentcount blogId={data.blog._id} />
                </div>
              </div>
            </section>

            <section id="blogBody">
              <div className="md:px-3">
                <h1 className="md:text-2xl text-lg border-t pt-3 mb-5 break-words">
                  <span className="font-semibold">Title:</span>{" "}
                  {data.blog.title}
                </h1>

                <div className="my-5 py-3">
                  <img
                    className="rounded w-full h-64 object-cover"
                    src={data.blog.featureImage}
                    alt="Blog feature"
                  />
                </div>

                <div className="py-2 font-lg text-black/60">Description:</div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: decode(data.blog.blogContent || ""),
                  }}
                />
              </div>
            </section>

            <div className="border-t mt-5 pt-5">
              <Comment blogId={data.blog._id} />
            </div>
          </div>
        </>
      ) : (
        <>data not found..</>
      )}

      <div className="border rounded lg:w-[30%] w-full">
        <RelatedBlog category={category} currentBlog={slug} />
      </div>
    </div>
  );
}
