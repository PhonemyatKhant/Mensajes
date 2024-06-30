"use client";
import { conversationFormSchema } from "@/schemas/conversationFormSchema";
import { FieldErrors, UseFormRegister, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import { FormControl, FormField, FormItem } from "./ui/form";

interface MessageInputProps {
  form: UseFormReturn<z.infer<typeof conversationFormSchema>>;
  placeholder?: string;
  name: "message";
  type?: string;
  required?: boolean;
  register: UseFormRegister<z.infer<typeof conversationFormSchema>>;
  errors: FieldErrors;
}

const MessageInput: React.FC<MessageInputProps> = ({
  placeholder,
  name,
  form,
  type,
  required,
  register,
}) => {
  return (
    <FormField
    
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='w-full'>
          <FormControl>
            <Input
              id={name}
              type={type}
              autoComplete={name}
              {...register(name, { required })}
              placeholder={placeholder}
              className="
              
          text-black
          font-light
          py-2
          px-4
          bg-neutral-100 
          dark:bg-lightgray
          w-full 
          rounded-full
          focus:outline-none
          dark:text-white
        "
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default MessageInput;
