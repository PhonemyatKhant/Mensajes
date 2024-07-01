"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { profileSettingsSchema } from "@/schemas/profileSettingsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import FormInput from "@/components/FormInput";
import getCurrentUser from "../actions/getCurrentUser";
import { User } from "@prisma/client";

const ProfileSettingsPage = ({ currentUser }: { currentUser: User }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  //   USE FORM
  const form = useForm({
    resolver: zodResolver(profileSettingsSchema),
    defaultValues: {
      name: currentUser.name,
      image: currentUser.image,
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  //    WATCH IMAGE CUSTOM IMAGE VARIABLE
  const image = watch("image");

  //   HANDLE IMAGE UPLOAD
  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, { shouldValidate: true });
  };

  //   ON SUBMIT FORM
  const onSubmit: SubmitHandler<z.infer<typeof profileSettingsSchema>> = (
    data
  ) => {
    setLoading(true);

    axios
      .post("/api/settings", data)
      .then(() => router.refresh())
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setLoading(false));
  };
  return (
    <div
      className="  px-4 
          py-10 
          sm:px-6 
          lg:px-8 
          lg:py-6 
          h-full "
    >
      <div
        className="
              text-2xl 
              font-bold 
              text-neutral-800 
              py-4
              dark:text-gray-200
            "
      >
        Settings
      </div>
      {/* SETTINGS CONTAINER  */}
      <div
        className="  px-4 
          py-4
          sm:px-6 
          lg:px-8 
          lg:py-2
          h-full "
      >
        <div className=" space-y-4 mb-4">
          <h1
            className="
              text-xl 
               font-semibold
              text-neutral-800 
              
              dark:text-gray-200
            "
          >
            Profile
          </h1>
          <p className=" text-muted-foreground">
            Make changes to your public information.
          </p>
        </div>

        {/* FORM INPUT  */}
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 bg-white  max-w-screen-sm rounded-lg "
          >
            {/* NAME INPUT  */}
            <FormInput
              form={form}
              placeholder={currentUser?.name!}
              name="name"
              label="Name"
              type="text"
              required={true}
              register={register}
              errors={errors}
              disabled={loading}
            />
            {/* PROFILE IMAGE  */}
            <div className=" mt-4">
              <Label className="">Image </Label>
              <div className=" flex gap-2 items-center">
                <Image
                  className=" rounded-full mt-2"
                  alt="profile image"
                  width={64}
                  height={64}
                  src={
                    currentUser?.image || image || "/images/profile-avatar.png"
                  }
                />
                <div className=" relative">
                  <CldUploadButton
                    className=" text-primary font-semibold"
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset={
                      process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME
                    }
                  >
                    Change
                  </CldUploadButton>
                </div>
              </div>

              <Button
                disabled={loading}
                className=" my-5"
                size={"sm"}
                type="submit"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
