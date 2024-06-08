"use client";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import { Loader } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast("You've been successfully registered!", {
          description: "Please log in.",
        });
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast("Uh oh! Something went wrong.", {
          description: "There was a problem with your request.",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <Dialog open={registerModal.isOpen} onOpenChange={registerModal.setOpen}>
        <DialogTrigger asChild>
          <Button className="rounded-none flex justify-start" variant={"ghost"}>
            Sign up
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="text-left">
            <DialogTitle>Welcome to StayNest</DialogTitle>
            <DialogDescription>Create an account</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isLoading}
                type="submit"
                variant="primary"
                className="w-full"
              >
                {isLoading ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  "Continue"
                )}
              </Button>
            </form>
          </Form>
          <DialogFooter>
            <div className="flex flex-col gap-2 w-full">
              <Button
                variant={"outline"}
                className="flex flex-row"
                onClick={() => signIn("google")}
              >
                <FcGoogle />
                <p className="flex-1">Continue with Google</p>
              </Button>
              <Button
                variant={"outline"}
                className="flex flex-row"
                onClick={() => signIn("github")}
              >
                <AiFillGithub />
                <p className="flex-1">Continue with GitHub</p>
              </Button>
              <div className="text-neutral-500 text-center mt-4 font-light flex flex-row justify-center items-center gap-1 text-sm">
                <p>Already have an account?</p>
                <p
                  onClick={() => {
                    registerModal.onClose();
                    loginModal.onOpen();
                  }}
                  className="text-neutral-800 cursor-pointer hover:underline"
                >
                  Login
                </p>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RegisterModal;
