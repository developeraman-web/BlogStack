import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RouteAddCategory, RouteEditCategory } from "@/helpers/RouteName";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import Loading from "@/components/Loading";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";
import { showToast } from "@/helpers/showToast";
import { deleteData } from "@/helpers/handleDelete";
import moment from "moment";

export default function Comments() {
  const [refreshData, setRefreshData] = useState(false);
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/comment/get-all-comments`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );

  const handleClick = async (comment_id) => {
    const del = await deleteData(
      `${getEnv("VITE_API_BASE_URL")}/comment/delete/${comment_id}`
    );

    if (del) {
      setRefreshData(!refreshData);
      showToast("success", "comment Deleted successfully");
    }
  };
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <Card>
        <CardContent>
          <Table>
            <TableCaption>All Comments</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Blog</TableHead>
                <TableHead>Commented by</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead className={"text-right"}>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.comments && data.comments.length > 0 ? (
                <>
                  {data?.comments?.map((comment, index) => {
                    return (
                      <TableRow key={comment._id}>
                        <TableCell>{comment.blogId.title}</TableCell>
                        <TableCell>{comment.author.name}</TableCell>
                        <TableCell>{comment.comment}</TableCell>
                        <TableCell className={"text-right"}>
                          <Button
                            variant={"outline"}
                            className={
                              "hover:bg-violet-500 hover:text-white mx-1"
                            }
                            size={"icon"}
                            onClick={() => handleClick(comment._id)}
                          >
                            <FaRegTrashCan />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </>
              ) : (
                <>
                  <TableRow>
                    <TableCell colSpan={"3"}>Data not found</TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
