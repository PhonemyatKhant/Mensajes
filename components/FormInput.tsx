import React from "react";
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
  UseFormReturn,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { loginSchema, registerSchema } from "@/schemas/authSchema";
import { conversationFormSchema } from "@/schemas/conversationFormSchema";

interface formProps {
  form:
    | UseFormReturn<z.infer<typeof loginSchema | typeof registerSchema | typeof conversationFormSchema>>
    | any;
  // control: Control<z.infer<typeof loginSchema | typeof registerSchema>>;
  placeholder?: string;
  name: string | any;
  label?: string;
  type: string;
  required?: boolean;
  disabled?: boolean;
  errors: FieldErrors;
  register: any;
}

const FormInput: React.FC<formProps> = ({
  form,
  placeholder,
  name,
  label,
  type,
  register,
  errors,
  required,
  disabled,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="dark:text-white">{label} </FormLabel>
          <FormControl>
            <Input
              autoComplete={name}
              type={type}
              placeholder={placeholder}
              {...field}
              {...register(name, { required })}
              disabled={disabled}
              className={cn(errors[name] && "focus:ring-rose-500")}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default FormInput;
