import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { FaRegComments } from "react-icons/fa";
const Commentcount = ({ blogId }) => {
  const {
    data: count,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/comment/count/${blogId}`, {
    method: "GET",
    credentials: "include",
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="flex items-center gap-1">
      <FaRegComments />
      {count && <p>{count.commentCount}</p>}
    </div>
  );
};

export default Commentcount;
