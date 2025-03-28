'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { signInSchema, signUpSchema } from '@/lib/authFormSchema';
import { signIn, signUp } from '@/lib/actions/user.actions';
import { Form } from '@/components/ui/form';
import PlaidLink from '@/components/PlaidLink';
import CustomInput from './CustomInput';

const AuthForm = ({ type }: AuthType) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const schema = type === 'sign-in' ? signInSchema : signUpSchema;

  const form = useForm<z.infer<typeof signInSchema> | z.infer<typeof signUpSchema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: z.infer<typeof signInSchema | typeof signUpSchema>) => {
    try {
      setIsLoading(true);
      if (type === 'sign-in') {
        const response = await signIn({ ...data });
        if (response) router.push('/');
      } else {
        const newUser = await signUp({ ...data } as z.infer<typeof signUpSchema>);
        setUser(newUser);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image src="/icons/logo.png" width={40} height={40} alt="GlobalSewa logo" className="" />
          <h1 className="text-[2rem] font-ibm-plex-serif font-bold text-black-1">GlobalSewa</h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
            <p className="text-16 font-normal text-gray-600">
              {user ? 'Link your account to get started' : 'Please enter your details'}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />{' '}
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === 'sign-up' && (
                <>
                  {/* Grid container for firstName and lastName */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      placeholder="Enter your first name"
                    />
                    <CustomInput
                      control={form.control}
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter your last name"
                    />
                  </div>

                  <CustomInput
                    control={form.control}
                    name="address1"
                    label="Address"
                    placeholder="Enter your specific address"
                  />

                  <CustomInput control={form.control} name="city" label="City" placeholder="Enter your city" />

                  {/* Grid container for state and postalCode */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CustomInput control={form.control} name="state" label="State" placeholder="Example: NY" />
                    <CustomInput
                      control={form.control}
                      name="postalCode"
                      label="Postal Code"
                      placeholder="Example: 11101"
                    />
                  </div>

                  {/* Grid container for dateOfBirth and ssn */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CustomInput
                      control={form.control}
                      name="dateOfBirth"
                      label="Date of Birth"
                      date
                      placeholder="MM/DD/YYYY"
                    />
                    <CustomInput control={form.control} name="ssn" label="SSN" placeholder="Example: 1234" />
                  </div>
                </>
              )}

              <CustomInput
                type="email"
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your email"
              />

              <CustomInput
                control={form.control}
                type="password"
                name="password"
                label="Password"
                placeholder="Enter your password"
              />

              <div className="flex flex-col gap-4">
                <Button type="submit" disabled={isLoading} className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                    </>
                  ) : type === 'sign-in' ? (
                    'Sign In'
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === 'sign-in' ? "Don't have an account?" : 'Already have an account?'}
            </p>
            <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="form-link">
              {type === 'sign-in' ? 'Sign up' : 'Sign in'}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
