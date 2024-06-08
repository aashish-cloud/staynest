"use client";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import { Loader } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

import {
  Dialog,
  DialogClose,
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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

const LoginModal = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof formSchema>) {
    // "use server"
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((res) => {
      setIsLoading(false);

      if (res?.error) {
        toast("Uh oh! Something went wrong.", {
          description: "Please enter the right credentials.",
        });
      } else {
        toast("Logged In", {
          description: "You are successfully logged in!",
        });
        router.refresh();
        loginModal.onClose();
      }
    });
  }

  return (
    <>
      <Dialog open={loginModal.isOpen} onOpenChange={loginModal.setOpen}>
        <DialogTrigger asChild>
          <Button className="rounded-none flex justify-start" variant={"ghost"}>
            Log in
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="text-left">
            <DialogTitle>Welcome Back</DialogTitle>
            <DialogDescription>Log in to your account</DialogDescription>
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
                <p>Don&apos;t have an account?</p>
                <p
                  onClick={() => {
                    loginModal.onClose();
                    registerModal.onOpen();
                  }}
                  className="text-neutral-800 cursor-pointer hover:underline"
                >
                  Sign up
                </p>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoginModal;
