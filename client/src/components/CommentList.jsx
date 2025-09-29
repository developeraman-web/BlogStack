import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import userIcon from "@/assets/images/user.png";
import moment from "moment";
import { useSelector } from "react-redux";

export default function CommentList({ blogId, newComment }) {
  const user = useSelector((state) => state.user);
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/comment/show-all/${blogId}`,
    {
      method: "GET",
      credentials: "include",
    },
    [user.isLoggedIn]
  );
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col gap-y-3 mb-1">
      <h4 className="font-semibold text-lg">
        {newComment ? (
          <>{data && data.comment.length + 1}</>
        ) : (
          <>{data && data.comment.length}</>
        )}{" "}
        Comments
      </h4>
      <div className="mt-5">
        {newComment && (
          <div className="flex py-1 gap-2 border-b">
            <div>
              <Avatar>
                <AvatarImage src={user?.user?.avatar || userIcon}></AvatarImage>
              </Avatar>
            </div>
            <div className="w-full">
              <div className="flex justify-between items-center">
                <p className="font-bold">{user.user.name}</p>
                <p className="text-sm text-black/50">
                  {moment(newComment.createdAt).format("DD-MM-YYYY")}
                </p>
              </div>
              <div className="py-1.5">{newComment.comment}</div>
            </div>
          </div>
        )}
        {data && data.comment ? (
          <>
            {data.comment.map((comm) => {
              return (
                <div key={comm._id} className="flex py-1 gap-2 border-b">
                  <div>
                    <Avatar>
                      <AvatarImage
                        src={comm.author.avatar || userIcon}
                      ></AvatarImage>
                    </Avatar>
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between items-center">
                      <p className="font-bold">{comm.author.name}</p>
                      <p className="text-sm text-black/50">
                        {moment(comm.createdAt).format("DD-MM-YYYY")}
                      </p>
                    </div>
                    <div className="py-1.5">{comm.comment}</div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>No Comments on this blog</>
        )}
      </div>
    </div>
  );
}
