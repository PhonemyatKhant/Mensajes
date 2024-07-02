"use client";

import useConversation from "@/app/hooks/useConversation";
import React from "react";
import { conversationFormSchema } from "@/schemas/conversationFormSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { HiPaperAirplane } from "react-icons/hi";
import { HiPhoto } from "react-icons/hi2";
import MessageInput from "../messages/MessageInput";
import { CldUploadButton } from "next-cloudinary";

const ConversationForm = () => {
  const { conversationId } = useConversation();

  //   USE FORM
  const form = useForm<z.infer<typeof conversationFormSchema>>({
    resolver: zodResolver(conversationFormSchema),
    defaultValues: {
      message: "",
    },
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;

  //   ON SUBMIT: ON MESSAGE SENT
  const onSubmit: SubmitHandler<z.infer<typeof conversationFormSchema>> = (
    data
  ) => {
    // RESET FORM VALUE AND RERENDER IT
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  // ON UPLOAD IMAGE : SENT IMAGE
  const handleUploadImage = (result: any) => {
    axios.post("/api/messages", {
      image: result.info.secure_url,
      conversationId: conversationId,
    });
  };

  return (
    <div
      className="
    py-4 
    px-4 
    bg-white 
    border-t 
    flex 
    items-center 
    gap-2 
    lg:gap-4 
    w-full
    dark:bg-dusk
    dark:border-lightgray
  "
    >
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUploadImage}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
      >
        <HiPhoto size={30} className="text-primary/80" />
      </CldUploadButton>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center gap-2 lg:gap-4 w-full"
        >
          <MessageInput
            type="text"
            form={form}
            name="message"
            register={register}
            errors={errors}
            required
            placeholder="Write a message"
          />
          <button
            type="submit"
            className="
        rounded-full 
        p-2 
        bg-primary/80
        cursor-pointer 
        hover:bg-primary
        transition
      "
          >
            <HiPaperAirplane size={18} className="text-white" />
          </button>
        </form>
      </Form>
    </div>
  );
};

export default ConversationForm;
