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
import { Input } from "@/components/ui/input";
import { getEnv } from "@/helpers/getEnv";
import { RouteCategoryDetail } from "@/helpers/RouteName";
import { showToast } from "@/helpers/showToast";
import { useFetch } from "@/hooks/useFetch";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import slugify from "slugify";
import z from "zod";

export default function EditCategory() {
  const navigate = useNavigate();
  const { category_id } = useParams();
  const {
    data: categoryData,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/category/show/${category_id}`,
    {
      method: "get",
      credentials: "include",
    },
    [category_id]
  );
  const formSchema = z.object({
    name: z.string().min(3, "Name should be atleast 3 characters"),
    slug: z.string().min(3, "slug must be 3 characters"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  useEffect(() => {
    if (categoryData) {
      form.reset({
        name: categoryData.category.name,
        slug: categoryData.category.slug,
      });
    }
  }, [categoryData]);

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name === "name" && value.name) {
        const slug = slugify(value.name, { lower: true, replacement: "-" });
        form.setValue("slug", slug);
      } else if (name === "name" && !value.name) {
        form.setValue("slug", "");
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  async function onSubmit(values) {
    try {
      const res = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/category/update/${category_id}`,
        {
          method: "put",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        showToast("error", data.message);
        return;
      }
      showToast("success", data.message);
      navigate(RouteCategoryDetail);
    } catch (error) {
      showToast("error", error.message);
    }
  }
  return (
    <div>
      <Card className={"pt-5 max-w-screen-md mx-auto"}>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-2">
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
              <div className="mb-2">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Category slug" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-5">
                <Button className={"w-full"} type="submit">
                  Edit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
