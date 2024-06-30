// LOG IN REGISTER PAGE 

"use client";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { useSession } from "next-auth/react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Variant = "LOGIN" | "REGISTER";
const Homepage = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/users");
    }
  }, [session.status]);

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

        {/* INPUT FORM LOGIN AND REGISTER  */}

        {variant === "LOGIN" ? (
          <LoginForm router={router} setVariant={setVariant} />
        ) : (
          <RegisterForm router={router} setVariant={setVariant} />
        )}
      </div>
    </div>
  );
};

export default Homepage;
