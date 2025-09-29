import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import userIcon from "@/assets/images/user.png";
import { Button } from "@/components/ui/button";
import { MdOutlineCameraAlt } from "react-icons/md";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { showToast } from "@/helpers/showToast";
import { Textarea } from "@/components/ui/textarea";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@/components/Loading";
import Dropzone from "react-dropzone";
import { setUser } from "@/redux/user/user.slice";
export default function Profile() {
  const dispatch = useDispatch();
  const [filePreview, setFilePreview] = useState();
  const [file, setFile] = useState();
  const user = useSelector((state) => state.user);
  const {
    data: userData,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/user/get-user/${user.user._id}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  const formSchema = z.object({
    name: z.string().min(3, "Name must be atleast 3 character long"),
    email: z.string().email(),
    bio: z.string().min(3, "bio must contain atleast 3 characters"),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("data", JSON.stringify(values));

      const res = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/user/update-user/${userData.user._id}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      const data = await res.json();
      if (!res.ok) {
        showToast("error", data.message);
        return;
      }
      showToast("success", data.message);
      dispatch(setUser(data.user));
    } catch (error) {
      showToast("error", error.message);
    }
  }

  useEffect(() => {
    if (userData && userData.success) {
      form.reset({
        name: userData.user.name,
        email: userData.user.email,
        bio: userData.user.bio,
      });

      dispatch(setUser(userData.user));
    }
  }, [userData]);
  const handleFile = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setFilePreview(preview);
  };
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <Card className={"max-w-screen-md mx-auto"}>
      <CardContent>
        <div className="flex justify-center items-center mt-5">
          <Dropzone onDrop={(acceptedFiles) => handleFile(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Avatar className={"w-28 h-28 relative group"}>
                  <AvatarImage
                    src={
                      filePreview
                        ? filePreview
                        : userData?.user?.avatar || userIcon
                    }
                  />

                  <div
                    className="absolute z-50 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center bg-black/50 border
             border-violet-500 rounded-full group-hover:flex hidden cursor-pointer"
                  >
                    <MdOutlineCameraAlt className="text-[#7c3aed]" />
                  </div>
                </Avatar>
              </div>
            )}
          </Dropzone>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea placeholder={"Add your bio"} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="New Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-5">
                <Button className={"w-full"} type="submit">
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
