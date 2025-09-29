import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { showToast } from "@/helpers/showToast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RouteSignIn } from "@/helpers/RouteName";
import { getEnv } from "@/helpers/getEnv";
import CommentList from "./CommentList";
export default function Comment({ blogId }) {
  const [newComment, setNewComment] = useState("");
  const [toggle, setToggle] = useState(false);
  const user = useSelector((state) => state.user);
  const author = user.user._id;
  const handleClick = () => {
    setToggle(!toggle);
  };
  const formSchema = z.object({
    comment: z.string().min(3, "comment should be atleast 3 characters"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });
  async function onSubmit(values) {
    try {
      const newValues = { ...values, blogId, author };
      const res = await fetch(`${getEnv("VITE_API_BASE_URL")}/comment/add`, {
        method: "post",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newValues),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast("error", data.message);
        return;
      }
      setNewComment(data.comment);
      form.reset();
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }
  return (
    <div>
      <h4
        onMouseOver={handleClick}
        className="flex items-center gap-4 text-2xl font-bold cursor-pointer hover:underline w-fit"
      >
        <FaRegComment />
        Add Comment
      </h4>
      {user && user.isLoggedIn ? (
        <>
          <Form {...form}>
            <form
              className={`${
                toggle
                  ? " max-h-[390px] opacity-100 mt-2"
                  : "max-h-0 opacity-0 delay-75"
              } duration-600`}
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="mb-2">
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="type your comment.."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-5">
                <Button className={"w-full"} type="submit">
                  comment
                </Button>
              </div>
            </form>
          </Form>
        </>
      ) : (
        <>
          <Button asChild>
            <Link to={RouteSignIn}>Sign in</Link>
          </Button>
        </>
      )}

      <div className="border-t mt-5 pt-5">
        <CommentList newComment={newComment} blogId={blogId} />
      </div>
    </div>
  );
}
