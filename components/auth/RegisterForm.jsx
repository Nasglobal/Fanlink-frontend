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
import { Checkbox } from "../ui/checkBox";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { notify,writeToLocalStorage } from "@/lib/utils";

import Loading from "@/components/ui/loading";
import PasswordInput from "../ui/PasswordInput";
import { register } from "@/lib/api";


const RegisterForm = () => {
  const [isLoading,setIsLoading] = useState(false)
  const router = useRouter();


  const LoginSchema = z.object({
    username: z.string().min(2, {
        message: "Username is required",}),
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
      username:"",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    setIsLoading(true)
    try {
      const response = await register(values);
      notify(response?.data?.message,"success");
      setIsLoading(false)
      writeToLocalStorage('token', response.data.access);
      router.push("/dashboard/fanlinks")
  } catch (error) {
      notify(error.response?.data?.error || 'Registration failed',"error");
      setIsLoading(false)
  }
  }

  return (
    <div className="mt-12 md:mt-8 w-full p-5  max-w-[460px] md:mx-auto rounded-md bg-[#222222] text-white md:p-10">
      <div className=" flex flex-col gap-2 mb-10">
        <h2 className="text-2xl font-bold">Create an account</h2>
        <p className="text-xs ">
        Fill in the neccessary information to create an account
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
        <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter username" type="text" {...field} />
                </FormControl>
                <FormMessage className="text-red-600"/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="Email" type="email" {...field} />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <div className="relative pb-3">
            <PasswordInput form={form} label="Password" name="password" />
            
          </div>
         

          <Button
            type="submit"
            className="w-full flex gap-1 text-white bg-[#D50613] rounded-3xl"
            disabled={isLoading}
          >
            {isLoading ? <Loading color="white" /> : null}
            Create an account 
          </Button>
        </form>
      </Form>
      <p className="text-xs py-1 text-center px-8 mt-5 font-normal">
        <Link href="/auth/login" className="text-white">
           Have an account? <span className="text-[#D50613]">login</span>
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
