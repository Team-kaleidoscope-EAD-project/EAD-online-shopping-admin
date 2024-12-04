"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateUserData } from "@/lib/api/updatetUserInfo";
import { getUserInfoFromToken } from "@/lib/getUserInformationFromToken";
import { useUserInfo } from "@/lib/userInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
});

const loginFormSchema = z.object({
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 2 characters.",
    })
    .max(30, {
      message: "Password must not be longer than 30 characters.",
    }),
  confirmed: z
    .string()
    .min(8, {
      message: "Password must be at least 2 characters.",
    })
    .max(30, {
      message: "Password must not be longer than 30 characters.",
    }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type LoginFormValues = z.infer<typeof loginFormSchema>;

const profileFormValues: Partial<ProfileFormValues> = {
  name: getUserInfoFromToken().username,
  email: getUserInfoFromToken().email,
};

const loginFormValues: Partial<LoginFormValues> = {};

export default function Page() {
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: profileFormValues,
    mode: "onChange",
  });

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: loginFormValues,
    mode: "onChange",
  });

  function profileFormOnSubmit(data: ProfileFormValues) {
    updateUserData(data);
  }

  function loginFormOnSubmit(data: LoginFormValues) {
    console.log(data);
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Used to identify your store in the marketplace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...profileForm}>
            <form
              onSubmit={profileForm.handleSubmit(profileFormOnSubmit)}
              className="space-y-4"
            >
              <FormField
                control={profileForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={profileForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button onClick={profileForm.handleSubmit(profileFormOnSubmit)}>
            Update
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Login Settings</CardTitle>
          <CardDescription>
            Used to identify your store in the marketplace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...loginForm}>
            <form
              onSubmit={loginForm.handleSubmit(loginFormOnSubmit)}
              className="space-y-4"
            >
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="confirmed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Update</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
