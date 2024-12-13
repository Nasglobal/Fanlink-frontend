"use client";
import React,{useState} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  notify,
  writeToLocalStorage,
} from "@/lib/utils";
import Loading from "@/components/ui/Loading";
import PasswordInput from "../ui/PasswordInput";
import { login } from "@/lib/api";



const LoginForm = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
 

  const LoginSchema = z.object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Provide a valid email"),
    password: z.string().min(2, {
      message: "Password is required",
    }),
  });

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    setIsLoading(true)
    try {
      const response = await login(values);
      setToken(response.data.access);
      writeToLocalStorage('token', response.data.access);
      notify("Login successful","success")
      setIsLoading(false)
      router.push("/dashboard/fanlinks")

  } catch (error) {
      notify(error.response?.data?.error || 'Login failed',"error");
      setIsLoading(false)
  }

    
  }

  return (
    <div className="mt-16 md:mt-10 w-full p-5  max-w-[460px] md:mx-auto rounded-md bg-[#222222] text-white md:p-10">
      <div className=" flex flex-col gap-2 mb-10">
        <h2 className="text-2xl font-bold">Login to your account</h2>
        <p className="text-xs ">
        Fill in the neccessary information to login
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="Email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="relative pb-3">
            <PasswordInput form={form} label="Password" name="password" />
            <div className="flex justify-between mt-3">
                <div className="flex gap-2">
              <Checkbox className="w-4 h-4" />
             <p className="text-xs text-center font-normal">Remember me</p>
                </div>
        <p className="text-xs text-center font-normal">
        <Link href="/auth/forgot-password" className="text-white">
          Forgot password ? 
        </Link>
      </p>
          
            </div>
            
          </div>
         

          <Button
            type="submit"
            className="w-full flex gap-1 text-white bg-[#D50613] rounded-3xl"
            disabled={isLoading}
          >
            {isLoading ? <Loading color="white" /> : null}
            Login 
          </Button>
        </form>
      </Form>
      <p className="text-xs py-1 text-center px-8 mt-5 font-normal">
        <Link href="/auth/register" className="text-white">
          {"Don't have an account?"} <span className="text-red-600">Register</span>
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
