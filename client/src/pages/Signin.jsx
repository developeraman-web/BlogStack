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
import { RouteIndex, RouteSignUp } from "@/helpers/RouteName";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";
import GoogleLogin from "@/components/GoogleLogin";
import logo from "@/assets/images/logo.png";

export default function Signin() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4, "password must be atleast 4 characters"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values) {
    try {
      const res = await fetch(`${getEnv("VITE_API_BASE_URL")}/auth/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) {
        showToast("error", data.message);
        return;
      }
      showToast("success", data.message);
      dispatch(setUser(data.user));
      navigate(RouteIndex);
    } catch (error) {
      showToast("error", error.message);
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <Card className={"w-[400px] p-5"}>
        <div className="flex justify-center items-center">
          <Link className="text-center" to={RouteIndex}>
            <img height={50} width={100} src={logo} alt="" />
          </Link>
        </div>
        <h1 className={"text-center text-2xl font-semibold "}>
          Login into Account
        </h1>
        <GoogleLogin />
        <div className="flex justify-center items-center border my-3">
          <span className="absolute bg-white text-sm">or</span>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-5">
              <Button className={"w-full"} type="submit">
                Sign In
              </Button>
              <div className="mt-5 text-sm text-center">
                <p>
                  Don't have an account?{" "}
                  <Link
                    className="text-indigo-700 hover:underline"
                    to={RouteSignUp}
                  >
                    Sign Up
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
