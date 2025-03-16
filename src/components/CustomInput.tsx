import React from 'react';
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';

import { Control, FieldPath } from 'react-hook-form';
import { z } from 'zod';
import { signInSchema, signUpSchema } from '@/lib/authFormSchema';
import { cn } from '@/lib/utils';

interface CustomInput extends React.ComponentProps<'input'> {
  control: Control<z.infer<typeof signInSchema | typeof signUpSchema>>;
  name: FieldPath<z.infer<typeof signInSchema | typeof signUpSchema>>;
  label: string;
  placeholder: string;
  date?: boolean;
}

const CustomInput = ({ control, name, label, className, placeholder, onChange, date, ...props }: CustomInput) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;

    // Remove non-numeric characters
    input = input.replace(/\D/g, '');

    // Auto-format the date as MM/DD/YYYY
    if (input.length > 2 && input.length <= 4) {
      input = input.slice(0, 2) + '/' + input.slice(2);
    } else if (input.length > 4) {
      input = input.slice(0, 2) + '/' + input.slice(2, 4) + '/' + input.slice(4, 8);
    }

    // Limit input length to 10 characters (MM/DD/YYYY)
    if (input.length > 10) {
      input = input.substring(0, 10);
    }

    // Update the input value
    e.target.value = input;

    // Call onChange if provided
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <div className="form-item">
            <FormLabel className="form-label">{label}</FormLabel>
            <div className="flex w-full flex-col">
              <FormControl>
                <Input
                  {...field}
                  placeholder={placeholder}
                  className={cn('input-class', error && '!border-red-500')}
                  type={date ? 'text' : 'text'} // Keep type as text to handle custom date formatting
                  onChange={(e) => {
                    if (date) handleDateChange(e);
                    field.onChange(e); // Ensure react-hook-form's field.onChange is called
                    onChange?.(e);
                  }} // Use the custom handler if date is true
                  {...props} // Spread all other props including onChange from parent
                />
              </FormControl>
              <FormMessage className="form-message mt-2" />
            </div>
          </div>
        );
      }}
    />
  );
};

export default CustomInput;
