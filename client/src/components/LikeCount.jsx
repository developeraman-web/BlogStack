import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { useFetch } from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
const LikeCount = ({ blogId }) => {
  const user = useSelector((state) => state.user);
  let id = "";
  if (user.isLoggedIn) {
    id = user.user._id;
  }
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const {
    data: count,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/like/count/${blogId}/${id}`,
    {
      method: "GET",
      credentials: "include",
    },
    [user.isLoggedIn]
  );
  useEffect(() => {
    if (count) {
      setLikes(count.count);
      setIsLiked(count.hasUserLiked);
    }
  }, [count]);
  const handleLike = async () => {
    try {
      if (!user.isLoggedIn) {
        return showToast("warning", "Please Login");
      }
      const body = { author: user.user._id, blogId: blogId };
      const res = await fetch(`${getEnv("VITE_API_BASE_URL")}/like/do-like`, {
        method: "post",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        return showToast("error", res.statusText);
      }
      setLikes(data.count);
      setIsLiked(data.hasUserLiked);
      showToast("success", data.message);
    } catch (error) {
      return showToast("error", error.message);
    }
  };

  return (
    <button
      onClick={handleLike}
      type="button"
      className="flex items-center gap-1 cursor-pointer "
    >
      <span>
        {isLiked ? (
          <FaHeart fill={`${isLiked ? "red " : ""}`} />
        ) : (
          <FaRegHeart />
        )}
      </span>
      {likes}
    </button>
  );
};

export default LikeCount;
