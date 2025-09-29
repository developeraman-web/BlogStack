import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "./ui/avatar";
import { RxCalendar } from "react-icons/rx";
import userIcon from "@/assets/images/user.png";
import moment from "moment";
import { Link } from "react-router-dom";
import { RouteBlogDetails } from "@/helpers/RouteName";

export default function BlogCard({ blog }) {
  const user = useSelector((state) => state.user);
  return (
    // <Link
    //   className="min-h-48"
    //   to={RouteBlogDetails(blog.category.slug, blog.slug)}
    // >
    //   <Card className={"pt-5"}>
    //     <CardContent>
    //       <div className="flex justify-between items-center">
    //         <div className="flex justify-between items-center gap-2">
    //           <Avatar>
    //             <AvatarImage
    //               src={blog.author.avatar ? blog.author.avatar : userIcon}
    //             ></AvatarImage>
    //           </Avatar>
    //           <span>{blog.author.name}</span>
    //         </div>
    //         {blog && blog.author.role === "admin" && (
    //           <Badge className={"bg-violet-400"} variant="outline">
    //             Admin
    //           </Badge>
    //         )}
    //       </div>
    //       <div className="my-2 aspect-[11/9]">
    //         <img className="rounded cover" src={blog?.featureImage} alt="" />
    //       </div>

    //       <div>
    //         <p className="flex items-center gap-2 mb-2">
    //           <RxCalendar />
    //           <span>{moment(blog.createdAt).format("DD-MM-YYYY")}</span>
    //         </p>
    //         <h2 className="text-2xl font-bold line-clamp-2">{blog.title}</h2>
    //       </div>
    //     </CardContent>
    //   </Card>
    // </Link>
    <Link
      className="min-h-48  hover:-translate-y-1.5 duration-300 shadow-md rounded-2xl"
      to={RouteBlogDetails(blog.category.slug, blog.slug)}
    >
      <Card className="pt-5 h-full flex flex-col">
        <CardContent className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={blog.author.avatar ? blog.author.avatar : userIcon}
                />
              </Avatar>
              <span className="text-sm font-medium">{blog.author.name}</span>
            </div>
            {blog.author.role === "admin" && (
              <Badge className="bg-violet-400" variant="outline">
                Admin
              </Badge>
            )}
          </div>

          <div className="relative w-full aspect-[16/9] overflow-hidden rounded mb-4">
            <img
              className="absolute inset-0 w-full h-full object-cover"
              src={blog.featureImage}
              alt={blog.title}
            />
          </div>

          <div className="mt-auto">
            <p className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <RxCalendar />
              <span>{moment(blog.createdAt).format("DD-MM-YYYY")}</span>
            </p>
            <h2 className="text-xl font-semibold line-clamp-2">{blog.title}</h2>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
