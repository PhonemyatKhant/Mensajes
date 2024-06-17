"use client";

import React, { useState } from "react";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "./ui/form";
import FormInput from "./FormInput";
import { Button } from "./ui/button";
import SocialIconButton from "./SocialIconButton";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useToast } from "./ui/use-toast";

//ZOD FORM SCHEMA

const registerSchema = z.object({
  email: z.string().email("This is not a valid email!"),
  password: z.string().min(5, { message: "Must be 5 or more characters long" }),
  username: z.string().min(1, { message: "Username is required" }),
});

// DEFINE PROPS TYPE
interface LoginFormProps {
  setVariant: React.Dispatch<React.SetStateAction<"LOGIN" | "REGISTER">>;
}

// AUTH FORM COMPONENT
const RegisterForm: React.FC<LoginFormProps> = ({ setVariant }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  // USE FORM
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
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
  const onSubmit: SubmitHandler<z.infer<typeof registerSchema>> = async (
    data
  ) => {
    setIsLoading(true);

    // REGISTER USER
    await axios
      .post("/api/register", data)
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "An Error Occured!",
          description: `${error.response.data}`,
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2 bg-white p-10 rounded-lg mt-7"
        >
          <FormInput
            control={form.control}
            placeholder="Your Username"
            name="username"
            label="Username"
            type="text"
            required={true}
            register={register}
            errors={errors}
            disabled={isLoading}
          />

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
          <Button className=" w-full" size="sm" disabled={isLoading}>
            Register
          </Button>
          <h2 className=" text-sm">
            Already have an account?
            <span>
              <Button
                className="p-1"
                variant="link"
                type="button"
                onClick={() => setVariant("LOGIN")}
              >
                login
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

export default RegisterForm;
