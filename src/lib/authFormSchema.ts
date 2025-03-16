import { string, object } from 'zod';

const baseSchema = object({
  email: string().email('Please enter a valid email address.').min(1, 'Email is required.'),
  password: string().min(8, 'Password must be at least 8 characters long.').min(1, 'Password is required.'),
});

export const signUpSchema = baseSchema.extend({
  firstName: string().min(3, 'First name must be at least 3 characters long.').min(1, 'First name is required.'),
  lastName: string().min(3, 'Last name must be at least 3 characters long.').min(1, 'Last name is required.'),
  address1: string().max(50, 'Address must be no more than 50 characters long.').min(1, 'Address is required.'),
  city: string().max(50, 'City must be no more than 50 characters long.').min(1, 'City is required.'),
  state: string().min(2, 'State must be more than 2 characters long.').min(1, 'State is required.'),
  postalCode: string().min(3, 'Postal code must be at least 3 characters long.').min(1, 'Postal code is required.'),
  dateOfBirth: string().refine(
    (val) => {
      const regex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!regex.test(val)) return false;

      // Parse the date
      const [month, day, year] = val.split('/').map(Number);
      const date = new Date(year, month - 1, day);

      if (isNaN(date.getTime())) return false;

      const currentDate = new Date();
      const minDate = new Date();
      minDate.setFullYear(currentDate.getFullYear() - 150);

      return date >= minDate && date <= currentDate;
    },
    {
      message: 'Date of Birth must be a valid date in MM/DD/YYYY format',
    },
  ),
  ssn: string().min(3, 'SSN must be at least 3 characters long.').min(1, 'SSN is required.'),
});

export const signInSchema = baseSchema;
