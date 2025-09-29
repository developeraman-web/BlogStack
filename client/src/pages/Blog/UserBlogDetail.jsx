import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  RouteAddBlog,
  RouteAddCategory,
  RouteEditBlog,
  RouteEditCategory,
} from "@/helpers/RouteName";
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
import { CiEdit } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import moment from "moment";
import { showToast } from "@/helpers/showToast";
import { deleteData } from "@/helpers/handleDelete";
import Loading from "@/components/Loading";
import { useSelector } from "react-redux";

export default function UserBlogDetail() {
  const user = useSelector((state) => state.user);
  const [refreshData, setRefreshData] = useState(false);
  const {
    data: blogData,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/get-user-blog/${user?.user?._id}`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );
  const handleClick = async (id) => {
    const del = await deleteData(
      `${getEnv("VITE_API_BASE_URL")}/blog/delete/${id}`
    );
    if (del) {
      setRefreshData(!refreshData);
      showToast("success", "Data Deleted successfully");
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
        <CardHeader>
          <div>
            <Button asChild>
              <Link to={RouteAddBlog}>Add Blog</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table className={"overflow-x-auto"}>
            <TableCaption>Your Blogs</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Dated</TableHead>
                <TableHead className={"text-right"}>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogData && blogData.blog && blogData.blog.length > 0 ? (
                <>
                  {blogData?.blog?.map((blog, index) => {
                    return (
                      <TableRow key={blog._id}>
                        <TableCell>{blog?.author.name}</TableCell>
                        <TableCell>{blog?.category.name}</TableCell>
                        <TableCell
                          className={"whitespace-normal break-words max-w-xs"}
                        >
                          {blog?.title}
                        </TableCell>
                        <TableCell
                          className={"whitespace-normal break-words max-w-xs"}
                        >
                          {blog?.slug}
                        </TableCell>
                        <TableCell>
                          {moment(blog?.createdAt).format("DD-MM-YYYY")}
                        </TableCell>
                        <TableCell className={"text-right"}>
                          <Button
                            variant={"outline"}
                            className={
                              "hover:bg-violet-500 hover:text-white mx-1"
                            }
                            asChild
                          >
                            <Link to={RouteEditBlog(blog._id)}>
                              <CiEdit />
                            </Link>
                          </Button>
                          <Button
                            variant={"outline"}
                            className={
                              "hover:bg-violet-500 hover:text-white mx-1"
                            }
                            size={"icon"}
                            onClick={() => handleClick(blog._id)}
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
