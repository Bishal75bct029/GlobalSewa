import { string, object } from 'zod';

const US_STATES = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
];

const baseSchema = object({
  email: string().email('Please enter a valid email address.').min(1, 'Email is required.'),
  password: string().min(8, 'Password must be at least 8 characters long.').min(1, 'Password is required.'),
});

export const signUpSchema = baseSchema.extend({
  firstName: string().min(3, 'First name must be at least 3 characters long.').min(1, 'First name is required.'),
  lastName: string().min(3, 'Last name must be at least 3 characters long.').min(1, 'Last name is required.'),
  address1: string().max(50, 'Address must be no more than 50 characters long.').min(1, 'Address is required.'),
  city: string().max(50, 'City must be no more than 50 characters long.').min(1, 'City is required.'),
  state: string().refine((val) => US_STATES.includes(val), {
    message: 'Invalid US state abbreviation.',
  }),
  postalCode: string().regex(
    /^\d{5}(-\d{4})?$/,
    'Invalid postal code. Must be a 5-digit ZIP or ZIP+4 format (e.g., 50314 or 50314-1234).',
  ),
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
      const maxDate = new Date();
      minDate.setFullYear(currentDate.getFullYear() - 125);
      maxDate.setFullYear(currentDate.getFullYear() - 18);

      return date >= minDate && date <= maxDate;
    },
    {
      message: 'Date of Birth must be a valid date in MM/DD/YYYY format between 18-125 years',
    },
  ),
  ssn: string()
    .regex(/^\d{4}$|^\d{9}$/, 'SSN must be exactly 4 or 9 digits number.')
    .min(1, 'SSN is required.'),
});

export const signInSchema = baseSchema;
