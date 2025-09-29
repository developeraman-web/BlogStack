import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { RouteSignIn, RouteSignUp } from "@/helpers/RouteName";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import GoogleLogin from "@/components/GoogleLogin";

export default function Signup() {
  const navigate = useNavigate();
  const formSchema = z.object({
    name: z.string().min(3, "Name should be atleast 3 characters"),
    email: z.string().email(),
    password: z.string().min(4, "password must be atleast 4 characters"),
    confirmPassword: z
      .string()
      .refine(
        (data) => data.password === data.confirmPassword,
        "password must be same"
      ),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  async function onSubmit(values) {
    try {
      const res = await fetch(`${getEnv("VITE_API_BASE_URL")}/auth/register`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast("error", data.message);
        return;
      }
      navigate(RouteSignIn);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <Card className={"w-[400px] p-5"}>
        <div>
          <h1 className={"text-center text-xl font-semibold py-2"}>
            Create your Account
          </h1>
          <GoogleLogin />
          <div className="flex justify-center items-center border my-5">
            <span className="absolute bg-white text-sm">or</span>
          </div>
        </div>

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
            <div className="mb-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type={"password"}
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-2">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input
                        type={"password"}
                        placeholder="Enter your password again"
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
                Sign Up
              </Button>

              <div className="mt-3 text-sm text-center">
                <p>
                  Already have an account?{" "}
                  <Link
                    className="text-indigo-700 hover:underline"
                    to={RouteSignIn}
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
