"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "./ui/form";
import FormInput from "./FormInput";
import { Button } from "./ui/button";
import SocialIconButton from "./SocialIconButton";
import { FaGithub, FaGoogle } from "react-icons/fa";

//ZOD FORM SCHEMA

const loginSchema = z.object({
  email: z.string().email("This is not a valid email!"),
  password: z.string().min(5, { message: "Must be 5 or more characters long" }),
});

// DEFINE PROPS TYPE
interface LoginFormProps {
  setVariant: React.Dispatch<React.SetStateAction<"LOGIN" | "REGISTER">>;
}

// AUTH FORM COMPONENT
const LoginForm: React.FC<LoginFormProps> = ({ setVariant }) => {
  // LOGIN OR REGISTER

  const [isLoading, setIsLoading] = useState(false);

  // USE FORM
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  // ON SUBMIT FUNCTION
  const onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = (data) => {
    setIsLoading(true);
    console.log(data);

    //register
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2 w-full bg-white p-10 rounded-lg mt-7"
        >
          <FormInput
            control={form.control}
            placeholder="example@email.com"
            name="email"
            label="Email"
            type="text"
            required={true}
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <FormInput
            control={form.control}
            placeholder="*******"
            name="password"
            label="Password"
            type="password"
            required={true}
            register={register}
            errors={errors}
            disabled={isLoading}
          />

          {/* SUBMIT BUTTON  */}

          <Button className=" w-full" size="sm" disabled={isLoading}>
            Login
          </Button>
          <h2 className=" text-sm">
            Don't have an account?
            <span>
              <Button
                className="p-1"
                variant="link"
                type="button"
                onClick={() => setVariant("REGISTER")}
              >
                create an account
              </Button>
            </span>
          </h2>

          {/* SOCIAL ICONS  */}

          <div className="flex gap-2 justify-between">
            <SocialIconButton
              icon={FaGithub}
              onClickFunction={() => {
                console.log("clicked");
              }}
            />
            <SocialIconButton
              icon={FaGoogle}
              onClickFunction={() => {
                console.log("clicked");
              }}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
