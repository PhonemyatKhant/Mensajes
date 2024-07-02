"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormReset,
  UseFormReturn,
  UseFormSetValue,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { loginSchema, registerSchema } from "@/schemas/authSchema";
import { conversationFormSchema } from "@/schemas/conversationFormSchema";
import { groupChatSchema, memberSchema } from "@/schemas/groupChatSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@prisma/client";

type memberProps = {
  label: string;
  value: string;
};

interface formProps {
  form: UseFormReturn<z.infer<typeof groupChatSchema>> | any;
  reset?: UseFormReset<z.infer<typeof groupChatSchema>>;
  users: User[];
  label?: string;
  disabled?: boolean;
  register: any;
  members: memberProps[];
  setValue: UseFormSetValue<z.infer<typeof groupChatSchema>>;
}

const SelectInput: React.FC<formProps> = ({
  form,
  label,
  disabled,
  register,
  members,
  users,
  setValue,
}) => {
  const membersArray = useMemo(() => {
    return members;
  }, [members]);
  // console.log(members, "Members");
  return (
    <FormField
      disabled={disabled}
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label} </FormLabel>
          <Select
            onValueChange={(name) => {
              field.onChange;
              // search id
              const id = users.map((user) => {
                if (user.name === name) return user.id;
              });

              const nameArray = membersArray.map(member=>member.label)
             

              if (!nameArray.includes(name)) {
                setValue(
                  "members",
                  [...membersArray, { label: name, value: id[0]! }],
                  {
                    shouldValidate: true,
                  }
                );
              }
            }}
            value=""
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a group member" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {users.map((user) => (
                <SelectItem id={user.id!} value={user.name!}>
                  {user.name}{" "}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectInput;
