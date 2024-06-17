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
import { formSchema } from "./LoginForm";
import { z } from "zod";

interface formProps {
  control: Control<z.infer<typeof formSchema>>;
  placeholder: string;
  name: keyof z.infer<typeof formSchema>;
  label: string;
  type: string;
  required?: boolean;
  disabled?: boolean;
  errors: FieldErrors;
  register: any;
}



const FormInput: React.FC<formProps> = ({
  control,
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
      control={control}
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
