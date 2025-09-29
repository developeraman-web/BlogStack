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
import { useSelector } from "react-redux";

export default function UserCategoryDetail() {
  const [refreshData, setRefreshData] = useState(false);
  const user = useSelector((state) => state.user);
  const {
    data: categoryData,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/category/get-user-category/${
      user?.user?._id
    }`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );
  const handleClick = async (category_id) => {
    const del = await deleteData(
      `${getEnv("VITE_API_BASE_URL")}/category/delete/${category_id}`
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
              <Link to={RouteAddCategory}>Add Category</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Your Blog Categories</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className={"text-right"}>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryData &&
              categoryData.category &&
              categoryData.category.length > 0 ? (
                <>
                  {categoryData?.category?.map((category, index) => {
                    return (
                      <TableRow key={category._id}>
                        <TableCell>{category.name}</TableCell>
                        <TableCell>{category.slug}</TableCell>
                        <TableCell className={"text-right"}>
                          <Button
                            variant={"outline"}
                            className={
                              "hover:bg-violet-500 hover:text-white mx-1"
                            }
                            asChild
                          >
                            <Link to={RouteEditCategory(category._id)}>
                              <CiEdit />
                            </Link>
                          </Button>
                          <Button
                            variant={"outline"}
                            className={
                              "hover:bg-violet-500 hover:text-white mx-1"
                            }
                            size={"icon"}
                            onClick={() => handleClick(category._id)}
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
