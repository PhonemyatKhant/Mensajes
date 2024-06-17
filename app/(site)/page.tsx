"use client";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import Image from "next/image";
import React, { useState } from "react";

type Variant = "LOGIN" | "REGISTER";
const Homepage = () => {
  const [variant, setVariant] = useState<Variant>("REGISTER");

  return (
    <div className=" flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100 ">
      <div className=" sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          alt="logo"
          src="/assets/ChatLogo.png"
          height={56}
          width={56}
          className=" mx-auto  w-auto"
        />
        <h2 className=" mt-6 text-clip text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        {variant === "LOGIN" ? (
          <LoginForm setVariant={setVariant} />
        ) : (
          <RegisterForm setVariant={setVariant} />
        )}
      </div>
    </div>
  );
};

export default Homepage;
