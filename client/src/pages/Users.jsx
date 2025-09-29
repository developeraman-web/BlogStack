import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
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
import { FaRegTrashCan } from "react-icons/fa6";
import { showToast } from "@/helpers/showToast";
import { deleteData } from "@/helpers/handleDelete";
import moment from "moment";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import userIcon from "@/assets/images/user.png";

export default function Users() {
  const [refreshData, setRefreshData] = useState(false);
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/user/get-all-users`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );

  const handleClick = async (user_id) => {
    const del = await deleteData(
      `${getEnv("VITE_API_BASE_URL")}/user/delete/${user_id}`
    );

    if (del) {
      setRefreshData(!refreshData);
      showToast("success", "user Deleted successfully");
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
            <TableCaption>All Users</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Avatar</TableHead>
                <TableHead>role</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className={"text-right"}>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.users && data.users.length > 0 ? (
                <>
                  {data?.users?.map((user, index) => {
                    return (
                      <TableRow key={user._id}>
                        <TableCell>
                          <Avatar>
                            <AvatarImage src={user.avatar || userIcon} />
                          </Avatar>
                        </TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell className={"text-right"}>
                          <Button
                            variant={"outline"}
                            className={
                              "hover:bg-violet-500 hover:text-white mx-1"
                            }
                            size={"icon"}
                            onClick={() => handleClick(user._id)}
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
