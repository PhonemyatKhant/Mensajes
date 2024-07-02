"use client";

import axios from "axios";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import FormInput from "./FormInput";
import { Form } from "./ui/form";
import { z } from "zod";
import { groupChatSchema } from "@/schemas/groupChatSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectInput from "./SelectInput";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface GroupChatDialogProps {
  setOpenDialog: any;
  users: User[];
}

const GroupChatDialog: React.FC<GroupChatDialogProps> = ({
  setOpenDialog,
  users = [],
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof groupChatSchema>>({
    resolver: zodResolver(groupChatSchema),
    defaultValues: {
      name: "",
      members: [],
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,

    formState: { errors },
  } = form;

  const members = watch("members");
  // ON SUBMIT
  const onSubmit: SubmitHandler<z.infer<typeof groupChatSchema>> = (data) => {
    console.log("hello");

    setIsLoading(true);

    axios
      .post("/api/conversations", {
        ...data,
        isGroup: true,
      })
      .then(() => {
        // router.refresh();
        setOpenDialog(false);
      })
      .catch((error) => {
        toast.error("Something went wrong!");
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // console.log(errors);
  // console.log(members, "MEMBERS");

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>Create a group chat</AlertDialogTitle>
        <AlertDialogDescription>
          Create a group chat to chat together as a group.
        </AlertDialogDescription>
      </AlertDialogHeader>
      {/* FORM INPUT  */}
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 bg-white  max-w-screen-sm rounded-lg "
        >
          {/* NAME INPUT  */}
          <FormInput
            form={form}
            placeholder="Group Chat Name"
            name="name"
            label="Name"
            type="text"
            required={true}
            register={register}
            errors={errors}
            disabled={isLoading}
          />

          {/* SELECT INPUT  */}
          <SelectInput
            members={members}
            users={users}
            disabled={isLoading}
            setValue={setValue}
            label="members"
            form={form}
            register={register}
          />
          {/* MEMBERS BUTTON  */}
          <div className=" space-x-3 space-y-3 ">
            {members &&
              members.map((member) => (
                <Button
                  key={member.label}
                  className=" bg-primary/80"
                  size={"sm"}
                  disabled={isLoading}
                  onClick={() => {
                    const membersArray = members.filter(
                      (m) => m.label !== member.label
                    );
                    setValue("members", membersArray, {
                      shouldValidate: true,
                    });
                  }}
                >
                  {member.label}
                </Button>
              ))}{" "}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
            <Button disabled={isLoading} type="submit">
              Continue
            </Button>
          </AlertDialogFooter>
        </form>
      </Form>
    </>
  );
};

export default GroupChatDialog;
