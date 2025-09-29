import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Dropzone from "react-dropzone";
import { Input } from "@/components/ui/input";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import z from "zod";
import { useFetch } from "@/hooks/useFetch";
import Editor from "@/components/Editor";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RouteBlog } from "@/helpers/RouteName";
import { decode } from "entities";

export default function EditBlog() {
  const navigate = useNavigate();
  const { blog_id } = useParams();
  const user = useSelector((state) => state.user);
  const [filePreview, setFilePreview] = useState();
  const [file, setFile] = useState();
  const [initialData, setInitialData] = useState("");
  const { data: categoryData } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/category/all-category`,
    {
      method: "get",
      credentials: "include",
    },
    []
  );
  const {
    data: blogData,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/edit/${blog_id}`,
    {
      method: "get",
      credentials: "include",
    },
    [blog_id]
  );
  const formSchema = z.object({
    title: z.string().min(3, "title should be atleast 3 characters"),
    category: z.string().min(3, "category should be atleast 3 characters"),
    blogContent: z.string().min(3, "category should be atleast 3 characters"),
    slug: z.string().min(3, "slug must be 3 characters"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      slug: "",
      blogContent: "",
    },
  });

  useEffect(() => {
    if (blogData) {
      setFilePreview(blogData.blog.featureImage);
      form.setValue("category", blogData.blog.category._id);
      form.setValue("title", blogData.blog.title);
      form.setValue("slug", blogData.blog.slug);
      form.setValue("blogContent", blogData.blog.blogContent);
    }
  }, [blogData]);

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name === "title" && value.title) {
        const slug = slugify(value.title, { lower: true, replacement: "-" });
        form.setValue("slug", slug);
      } else if (name === "title" && !value.title) {
        form.setValue("slug", "");
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  const handleFile = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setFilePreview(preview);
  };

  const handleEditorData = (event, editor) => {
    const data = editor.getData();
    form.setValue("blogContent", data);
  };
  async function onSubmit(values) {
    try {
      const newValues = { ...values };
      const formData = new FormData();
      formData.append("file", file);
      formData.append("data", JSON.stringify(newValues));

      const res = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/blog/update/${blog_id}`,
        {
          method: "put",
          credentials: "include",
          body: formData,
        }
      );

      const data = await res.json();
      if (!res.ok) {
        showToast("error", data.message);
        return;
      }
      form.reset();
      setFile();
      setFilePreview();

      showToast("success", data.message);
      navigate(RouteBlog);
    } catch (error) {
      showToast("error", error.message);
    }
  }
  return (
    <div>
      <Card className={"pt-5"}>
        <CardContent>
          <h1 className="text-2xl font-bold mb-4">Edit blog</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-4 py-1">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categoryData &&
                              categoryData?.category?.length > 0 &&
                              categoryData?.category.map((category) => (
                                <SelectItem
                                  key={category._id}
                                  value={category?._id}
                                >
                                  {category?.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4 py-1">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Blog Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-4 py-1">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter blog slug" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4 py-1">
                <span className="block mb-2">
                  <FormLabel>Featured image</FormLabel>
                </span>
                <Dropzone onDrop={(acceptedFiles) => handleFile(acceptedFiles)}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="flex justify-center items-center w-36 h-28 border-2 border-dashed rounded-2xl">
                        <img src={filePreview} alt="" />
                      </div>
                    </div>
                  )}
                </Dropzone>
              </div>
              <div className="mb-4 py-1">
                <FormField
                  control={form.control}
                  name="blog content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>blog content</FormLabel>
                      <FormControl>
                        <Editor
                          key={blogData?.blog._id}
                          data={
                            blogData ? decode(blogData?.blog?.blogContent) : ""
                          }
                          onChange={(e, editor) => handleEditorData(e, editor)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-5">
                <Button className={"w-full"} type="submit">
                  Add
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
