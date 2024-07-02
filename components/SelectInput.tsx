"use client";

import React, { useMemo } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn, UseFormSetValue } from "react-hook-form";
import { z } from "zod";
import { groupChatSchema } from "@/schemas/groupChatSchema";
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
  const membersArray = useMemo(() => members, [members]);

  return (
    <FormField
      disabled={disabled}
      control={form.control}
      name="members"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label} </FormLabel>
          <Select
            onValueChange={(name) => {
              const user = users.find((user) => user.name === name);

              // IF THE USER EXISTS AND NOT EXISTS IN THE MEMBERS ARRAY 
              if (
                user &&
                !membersArray.some((member) => member.value === user.id)
              ) {
                setValue(
                  "members",
                  [...membersArray, { label: name, value: user.id }],
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
                <SelectItem key={user.id} value={user.name!}>
                  {user.name}
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
